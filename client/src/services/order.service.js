import httpService from './http.service'

const orderEndpoint = 'api/order/'

const orderService = {
	getOrder: async () => {
		const { data } = await httpService.get(orderEndpoint)
		return data
	},
	createOrder: async (paypoad) => {
		const { data } = await httpService.post(orderEndpoint, paypoad)
		return data
	},
	updateOrder: async (id, payload) => {
		const { data } = await httpService.patch(orderEndpoint + id, payload)
		return data
	},
	removeOrder: async (id) => {
		const { data } = await httpService.delete(orderEndpoint + id)
		return data
	},
}

export default orderService
