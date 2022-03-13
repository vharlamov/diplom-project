import httpService from './http.service'

const imgEndpoint = 'upload-profile-pic/'

const imageService = {
	getImage: async () => {
		const req = await httpService.get('/')

		return req.data
	},

	createImage: async (payload) => {
		// console.log('create image', payload)
		const { data } = await httpService.post(imgEndpoint, payload)

		return data
	},

	removeImage: async (payload) => {
		const { data } = await httpService.delete(imgEndpoint + payload)
		// const { data } = await httpService.delete(imgEndpoint + ':' + payload)
		// console.log('image service remove payload', payload)

		return data
	},
}

export default imageService
