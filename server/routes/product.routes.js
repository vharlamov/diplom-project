const express = require('express')
const Product = require('../models/Product')
const router = express.Router()

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

router.post('/', async (req, res) => {
	try {
		console.log('post', req.body)
		const product = await Product.create(req.body)
		res.status(200).send(product)
	} catch (e) {
		res.status(500).json({
			error: e,
			message: 'На сервере произошла ошибка (product post)',
		})
	}
})

router.delete('/:id', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findByIdAndUpdate(id, req.body)
		res.status(200).send(product)
		console.log('product udated', product)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (product delete)',
		})
	}
})

module.exports = router
