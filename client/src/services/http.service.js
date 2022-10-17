import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.js'
import authService from './auth.service'
import localStorageService from './localStorage.service'

console.log('configFile', configFile)

const http = axios.create({
	baseURL: configFile,
})

http.interceptors.request.use(
	async function (config) {
		const expiresDate = localStorageService.getTokenExpiresDate()
		const refresh = localStorageService.getRefreshToken()
		const isExpire = refresh && expiresDate < Date.now()

		if (isExpire) {
			const data = await authService.refresh()
			localStorageService.setTokens(data)
		}

		const accessToken = localStorageService.getAccessToken()

		if (accessToken) {
			config.headers = {
				...config.headers,
				authorization: `Bearer ${accessToken}`,
			}
		}

		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)

http.interceptors.response.use(
	(res) => {
		res.data = { content: res.data }

		return res
	},
	function (error) {
		const expectedErrors =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500

		if (!expectedErrors) {
			toast.error('Somthing was wrong. Try it later')
		}
	}
)

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
}

export default httpService
