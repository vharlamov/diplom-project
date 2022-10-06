const express = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = express.Router()

router.get('/', auth, async (req, res) => {
	// console.log('server user get')

	try {
		const list = await User.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (user get)',
		})
	}
})

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.status(200).send(user)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (user post)',
		})
	}
})

router.patch('/:id', async (req, res) => {
	console.log('user patch run', req.body)
	const { id } = req.params
	try {
		const data = await User.findByIdAndUpdate(id, req.body)
		console.log('user patch success', data)
		const user = await User.findById(id)
		res.status(200).send(user)
	} catch (e) {
		res
			.status(500)
			.json({ message: 'На сервере произошла ошибка (user update)' })
	}
})

router.delete('/:id', async (req, res) => {})

module.exports = router
