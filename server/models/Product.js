const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
		},
		status: { type: Boolean },
		images: [{ type: String }],
		price: { type: Number },
		discount: { type: Number },
		sales: { type: Number },
		rate: { type: Number },
		chapter: { type: String },
		category: { type: String },
		subcategory: { type: String },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('Product', schema)
