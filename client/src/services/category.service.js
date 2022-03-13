import httpService from './http.service'

const categoryEndpoint = 'api/category/'

const categoryService = {
	getCat: async () => {
		const { data } = await httpService.get(categoryEndpoint)
		return data
	},

	createCat: async (payload) => {
		const { data } = await httpService.post(categoryEndpoint, payload)
	},

	updateCat: async (id, payload) => {
		const { data } = await httpService.patch(categoryEndpoint + id, payload)
	},

	removeCat: async (id) => {
		const { data } = await httpService.delete(categoryEndpoint + id)
	},
}

export default categoryService
