import axios from 'axios'
import localStorageService from './localStorage.service'
import config from '../config.js'

const httpAuth = axios.create({
	baseURL: config + 'api/auth/',
})

const authService = {
	register: async (payload) => {
		const { data } = await httpAuth.post('signUp', payload)
		return data
	},

	login: async ({ email, password }) => {
		const { data } = await httpAuth.post('signInWithPassword', {
			email,
			password,
			returnSecureToken: true,
		})

		return data
	},

	logout: () => {
		httpAuth.post('logout')
	},

	proof: async () => {
		const token = localStorageService.getRefreshToken()
		const { data } = await httpAuth.post('proof', { token })

		return data
	},

	refresh: async () => {
		const { data } = await httpAuth.post('token', {
			grant_type: 'refresh_token',
			refresh_token: localStorageService.getRefreshToken(),
		})

		return data
	},
}

export default authService
