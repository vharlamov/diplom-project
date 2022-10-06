const express = require('express')
const Chapter = require('../models/Chapter')
const router = express.Router()
const auth = require('../middleware/auth.middleware')

router
	.route('/')
	.get(async (req, res) => {
		try {
			const list = await Chapter.find()
			res.status(200).send(list)
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка (chapter get)',
			})
		}
	})
	.post(auth, async (req, res) => {
		// console.log('POST works', req.body)
		try {
			const chapter = await Chapter.create(req.body)
			res.status(200).send(chapter)
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка (chapter post)',
			})
		}
	})

router.patch('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		await Chapter.updateOne({ _id: id }, { name: req.body.name })
		const chapter = await Chapter.findById(id)
		console.log('Server patched chapter', chapter)
		res.status(200).send(chapter)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (chapter update)',
		})
	}
})

router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const chapter = await Chapter.findById(id)
		await chapter.remove()
		res.status(200).send(chapter._id)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка (chapter remove)',
		})
	}
})

module.exports = router
