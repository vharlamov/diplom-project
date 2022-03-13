const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: { type: String },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('User', schema)
