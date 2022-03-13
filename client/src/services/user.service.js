import httpService from './http.service'
import localStorageService from './localStorage.service'

const userEndpoint = 'api/user/'

const userService = {
	getUser: async () => {
		const { data } = await httpService.get(userEndpoint)

		return data
	},

	createUser: async (payload) => {
		const { data } = await httpService.post(userEndpoint, payload)

		return data
	},

	removeUser: async (userId) => {
		const { data } = await httpService.delete(userEndpoint + userId, {
			_id: userId,
		})

		return data
	},

	updateUser: async (payload) => {
		const { data } = await httpService.patch(
			userEndpoint + localStorageService.getUserId(),
			payload
		)
	},
}

export default userService
