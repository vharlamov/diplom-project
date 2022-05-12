const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/', async (req, res) => {
	console.log('server user get')

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

// router.('/:id', async (req, res) => {
//
// })
router.delete('/:id', async (req, res) => {})

module.exports = router
