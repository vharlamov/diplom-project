const imageFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
		req.fileValidationError = 'Разрешена загрузка только изображений!'

		return cb(new Error('Разрешена загрузка только изображений!', false))
	}

	cb(null, true)
}

exports.imageFilter = imageFilter
