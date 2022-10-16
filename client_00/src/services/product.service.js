import httpService from './http.service'

const productEndpoint = 'api/product/'

const productService = {
	getProduct: async () => {
		const { data } = await httpService.get(productEndpoint)

		return data
	},

	createProduct: async (payload) => {
		const data = await httpService.post(productEndpoint, payload)
		return data
	},

	editProduct: async (id, payload) => {
		const { data } = await httpService.patch(productEndpoint + id, payload)
		return data
	},

	removeProduct: async (id) => {
		const { data } = await httpService.delete(productEndpoint + id, {
			_id: id,
		})

		return data
	},
}

export default productService
