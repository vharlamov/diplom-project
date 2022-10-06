const express = require('express')
const Order = require('../models/Order')
const router = express.Router()
const auth = require('../middleware/auth.middleware')

router.get('/', async (req, res) => {
	try {
		const list = await Order.find()
		res.status(200).send(list)
		console.log('order get', list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (order get)',
		})
	}
})

router.post('/', async (req, res) => {
	try {
		const order = await Order.create(req.body)
		res.status(200).send(order)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (order create)',
		})
	}
})

router.patch('/:id', async (req, res) => {
	const { id } = req.params
	try {
		await Order.findByIdAndUpdate(id, req.body)
		const order = await Order.findById(id)
		res.status(200).send(order)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (order patch)',
		})
	}
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	try {
		const order = await Order.findById(id)
		await order.remove()
		res.status(200).send(order._id)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (order delete)',
		})
	}
})

module.exports = router
