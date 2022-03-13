const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		chapter: {
			type: String,
			required: true,
		},
		subcategories: [{ type: Schema.Types.ObjectId, ref: 'subcategories' }],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('Category', schema)
