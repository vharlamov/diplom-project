const express = require('express')
const Subcategory = require('../models/Subcategory')
const router = express.Router()

router.get('/', async (req, res) => {
	console.log('server subcategory get')

	try {
		const list = await Subcategory.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (subcategory get)',
		})
	}
})
router.post('/', async (req, res) => {
	try {
		const subcategory = await Subcategory.create(req.body)
		res.status(200).send(subcategory)
	} catch (e) {
		res.status(500).json({
			error: e,
			message: 'На сервере произошла ошибка (subcategory post)',
		})
	}
})
router.delete('/:id', async (req, res) => {})

module.exports = router
