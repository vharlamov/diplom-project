const express = require('express')
const Category = require('../models/Category')
const router = express.Router()
const auth = require('../middleware/auth.middleware')

router
	.route('/')
	.get(async (req, res) => {
		try {
			const list = await Category.find()
			res.status(200).send(list)
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка (category get)',
			})
		}
	})
	.post(auth, async (req, res) => {
		try {
			const category = await Category.create(req.body)
			res.status(200).send(category)
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка (category post)',
			})
		}
	})

router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const category = await Category.findById(id)
		await category.remove()
		res.status(200).send(category)
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (category remove)',
		})
	}
})

router.patch('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		await Category.updateOne({ _id: id }, { name: req.body.name })
		const category = await Category.findById(id)
		res.status(200).send(category)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (category update)',
		})
	}
})

module.exports = router
