const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		status: {
			type: Number,
			required: true,
		},
		products: [
			{
				id: String,
				quantity: Number,
			},
		],
		comment: {
			type: String,
		},
		costAmount: {
			type: Number,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('Order', schema)
