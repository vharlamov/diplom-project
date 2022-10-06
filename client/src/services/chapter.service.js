import httpService from './http.service'

const chapterEndpoint = 'api/chapter/'

const chapterService = {
	getChapter: async () => {
		const { data } = await httpService.get(chapterEndpoint)
		return data
	},

	createChapter: async (payload) => {
		console.log('createChapter service', payload)
		const { data } = await httpService.post(chapterEndpoint, payload)
		return data
	},

	updateChapter: async (id, payload) => {
		const { data } = await httpService.patch(chapterEndpoint + id, payload)
		return data
	},

	removeChapter: async (id) => {
		const { data } = await httpService.delete(chapterEndpoint + id)
		return data
	},
}

export default chapterService
