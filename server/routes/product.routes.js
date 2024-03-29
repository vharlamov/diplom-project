const express = require('express')
const Product = require('../models/Product')
const router = express.Router()
const auth = require('../middleware/auth.middleware')

router.get('/', async (req, res) => {
	try {
		const list = await Product.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (product get)',
		})
	}
})

router.post('/', auth, async (req, res) => {
	try {
		const product = await Product.create(req.body)
		res.status(200).send(product)
	} catch (e) {
		res.status(500).json({
			error: e,
			message: 'На сервере произошла ошибка (product post)',
		})
	}
})

router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		await product.remove()
		res.send(null)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (product delete)',
		})
	}
})

router.patch('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		await Product.findByIdAndUpdate(id, req.body)
		const product = await Product.findById(id)
		res.status(200).send(product)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (product update)',
		})
	}
})

module.exports = router
