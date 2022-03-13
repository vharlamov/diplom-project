const express = require('express')
const Category = require('../models/Category')
const router = express.Router()

router.get('/', async (req, res) => {
	console.log('server category get')

	try {
		const list = await Category.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (category get)',
		})
	}
})
router.post('/', async (req, res) => {
	try {
		const category = await Category.create(req.body)
		res.status(200).send(category)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (category post)',
		})
	}
})
router.delete('/:id', async (req, res) => {})

module.exports = router
