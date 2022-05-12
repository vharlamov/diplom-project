const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') return next()

	try {
		const token = req.headers.authorization.split(' ')[1]

		if (!token) {
			res.status(401).json({ message: 'Unauthorized' })
		}

		const data = tokenService.validateAdmin(token)
		req.user = data

		next()
	} catch (e) {
		res.status(401).json({ message: 'Unauthorized' })
	}
}
