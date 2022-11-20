const { check, validationResult } = require('express-validator')
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const tokenService = require('../services/token.service')
const Token = require('../models/Token')

let isAdmin = false

router.post('/signUp', [
	check('email', 'Некорректный email').isEmail(),
	check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: 'INVALID_DATA',
						code: 400,
						errors: errors.array(),
					},
				})
			}
			const { email, password } = req.body

			const isExist = await User.findOne({ email })

			if (isExist) {
				return res.status(400).json({
					error: {
						message: 'EMAIL_EXISTS',
						code: 400,
					},
				})
			}

			const hashedPassword = await bcrypt.hash(password, 12)

			const newUser = await User.create({
				...req.body,
				password: hashedPassword,
				isAdmin: false,
			})

			const tokens = tokenService.generate({ _id: newUser._id })

			await tokenService.save(newUser._id, tokens.refreshToken)

			res.status(201).send({ ...tokens, userId: newUser._id })
		} catch (e) {
			res.status(500).json({
				error: e,
				message: 'На сервере произошла ошибка (signUp). Попробуйте позже.',
				code: 500,
			})
		}
	},
])

router.post('/signInWithPassword', [
	check('email', 'Некорректный email').normalizeEmail().isEmail(),
	check('password', 'Пароль не может быть пустым').exists(),
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: 'INVALID_DATA',
						code: 400,
						errors: errors.array(),
					},
				})
			}

			const { email, password } = req.body
			const existUser = await User.findOne({ email })

			if (!existUser) {
				return res.status(400).json({
					error: {
						message: 'EMAIL_NOT_FOUND',
						code: 400,
					},
				})
			}

			const isEqual = await bcrypt.compare(password, existUser.password)

			if (!isEqual) {
				return res.status(400).json({
					error: {
						message: 'INVALID_PASSWORD',
						code: 400,
					},
				})
			}

			const tokens = tokenService.generate({ _id: existUser._id })
			isAdmin = existUser.isAdmin

			await tokenService.save(existUser._id, tokens.refreshToken)

			res.status(200).send({
				...tokens,
				_id: existUser._id,
				user: existUser,
			})
		} catch (error) {
			res.status(500).json({
				message: 'На сервере произошла ошибка (signIn). Попробуйте позже.',
			})
		}
	},
])

function isTokenInvalid(data, dbToken) {
	return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async (req, res) => {
	try {
		const { refresh_token: refreshToken } = req.body
		const data = tokenService.validateRefresh(refreshToken)
		const dbToken = await tokenService.findToken(refreshToken)

		if (isTokenInvalid(data, dbToken)) {
			return res.status(401).json({
				message: 'Unauthorized',
			})
		}

		const tokens = tokenService.generate({
			id: dbToken.user.toString(),
		})

		await tokenService.save(data._id, tokens.refreshToken)
		res.status(200).send({ ...tokens, userId: data._id })
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (signIn token). Попробуйте позже.',
		})
	}
})

router.post('/proof', async (req, res) => {
	isAdmin = false

	try {
		if (req.body.token) {
			const adminProof = await tokenService.validateAdmin(req.body.token)
			isAdmin = adminProof.isAdmin
			res.status(200).send(adminProof)
		}
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (admin proof). Попробуйте позже.',
		})
	}
})

router.post('/logout', (req, res) => {
	isAdmin = false
	res.status(200).json({ isAdmin })
})

module.exports = router
