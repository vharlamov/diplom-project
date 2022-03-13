import httpService from './http.service'

const subcategoryEndpoint = 'api/subcategory/'

const subcategoryService = {
	getSubcat: async () => {
		const req = await httpService.get(subcategoryEndpoint)
		return req.data
	},

	createSubcat: async (payload) => {
		const { data } = await httpService.post(subcategoryEndpoint, payload)
	},

	removeSubcat: async (id) => {
		const { data } = await httpService.delete(subcategoryEndpoint + id)
	},
}

export default subcategoryService
