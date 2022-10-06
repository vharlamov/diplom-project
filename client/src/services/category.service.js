import httpService from './http.service'

const categoryEndpoint = 'api/category/'

const categoryService = {
	getCat: async () => {
		const { data } = await httpService.get(categoryEndpoint)
		return data
	},

	createCat: async (payload) => {
		const { data } = await httpService.post(categoryEndpoint, payload)
		return data
	},

	updateCat: async (id, payload) => {
		const { data } = await httpService.patch(categoryEndpoint + id, payload)
		return data
	},

	removeCat: async (id) => {
		const { data } = await httpService.delete(categoryEndpoint + id)
		return data
	},
}

export default categoryService
