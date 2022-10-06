const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const path = require('path')
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()
const helpers = require('./helpers')
const bodyParser = require('body-parser')
const fs = require('fs/promises')
// const readdir = require('fs/promises')
// const session = require('express-session')
const auth = require('./middleware/auth.middleware')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', routes)

const PORT = process.env.PORT ?? 8080

// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client')))

	const indexPath = path.join(__dirname, 'client', 'index.html')

	app.get('*', (req, res) => {
		res.sendFile(indexPath)
	})
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		)
	},
})

app.use(express.static(__dirname))

app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))

app.post('/upload-profile-pic', auth, (req, res, next) => {
	let upload = multer({
		storage: storage,
		fileFilter: helpers.imageFilter,
		limits: { fileSize: 100000000 },
	}).single('profile_pic')

	upload(req, res, function (err) {
		console.log('req.file', req.file)
		if (req.fileValidationError) {
			return res.send(req.fileValidationError)
		} else if (!req.file) {
			return res.send('Ошибка при загрузке')
		} else if (err instanceof multer.MulterError) {
			return res.send(err)
		} else if (err) {
			return res.send(err)
		}

		res.send(req.file.filename)
	})
})

app.delete('/upload-profile-pic/:filename', auth, (req, res) => {
	const filename = req.params.filename
	console.log('delete run')

	fs.unlink(__dirname + `/uploads/${filename}`, (err) => {
		if (err) console.log('delete error', err)
	})

	res.send(filename)
})

app.get('/', async (req, res) => {
	const files = await fs.readdir(__dirname + '/uploads')
	res.send(files)
})

async function start() {
	try {
		mongoose.connect(config.get('mongoUri'))
		console.log(chalk.cyan('MongoDB connected...'))
		app.listen(PORT, () => {
			console.log(chalk.cyan(`Server has been started on port ${PORT}...`))
		})
	} catch (e) {
		console.log(chalk.red(e.message))
		process.exit(1)
	}
}

start()
