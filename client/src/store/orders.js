import { createAction, createSlice } from '@reduxjs/toolkit'
import orderService from '../services/order.service'
import { usersSlice } from './users'

const orderSlice = createSlice({
	name: 'orders',
	initialState: {
		entities: [],
		currentOrder: null,
		isLoading: true,
		error: null,
		lastFetch: null,
		dataLoaded: false,
	},
	reducers: {
		orderRequested: (state) => {
			state.isLoading = true
		},
		orderRecieved: (state, action) => {
			state.entities = action.payload
			state.dataLoaded = true
			state.isLoading = false
		},
		orderReqFailed: (state, action) => {
			state.error = action.payload
			state.dataLoaded = false
		},
		orderCreated: (state, action) => {
			state.entities.push(action.payload)
			state.currentOrder = action.payload
		},
		orderRemoved: (state, action) => {
			state.entities = state.entities.filter((e) => e._id !== action.payload)
		},
		orderPatched: (state, action) => {
			const index = state.entities.findIndex(
				(e) => e._id === action.payload._id
			)
			state.entities[index] = action.payload
		},
	},
})

const { actions, reducer: ordersReducer } = orderSlice
const {
	orderRequested,
	orderRecieved,
	orderReqFailed,
	orderCreated,
	orderRemoved,
	orderPatched,
} = actions
const orderCreateReq = createAction('orders/orderCreateReq')
const orderCreateFailed = createAction('orders/orderCreateFailed')
const orderRemoveReq = createAction('orders/orderRemoveReq')
const orderPatchReq = createAction('orders/orderPatchReq')
const orderPatchFailed = createAction('orders/orderPatchFailed')

export const loadOrdersList = () => async (dispatch) => {
	dispatch(orderRequested())

	try {
		const { content } = await orderService.getOrder()
		dispatch(orderRecieved(content))
	} catch (e) {
		dispatch(orderReqFailed(e.message))
	}
}

export const createOrder = (payload) => async (dispatch) => {
	dispatch(orderCreateReq())
	try {
		const { content } = await orderService.createOrder(payload)
		dispatch(orderCreated(content))
		return content._id
	} catch (e) {
		dispatch(orderCreateFailed(e.message))
	}
}

export const removeOrder = (id) => async (dispatch) => {
	dispatch(orderRemoveReq())

	try {
		const { content } = await orderService.removeOrder(id)
		dispatch(orderRemoved(content))
	} catch (e) {
		dispatch(orderCreateFailed(e.message))
	}
}

export const updateOrder = (id, payload) => async (dispatch) => {
	dispatch(orderPatchReq())

	try {
		const { content } = await orderService.updateOrder(id, payload)
		dispatch(orderPatched(content))
	} catch (e) {
		dispatch(orderPatchFailed(e.message))
	}
}

export const getOrdersList = () => (state) => {
	return state.orders.entities
}

export const getCurrentOrder = () => (state) => state.orders.currentOrder

export const getOrdersLoadingStatus = () => (state) => {
	return state.orders.isLoading
}

export const getOrderById = (id) => (state) => {
	const order = state.orders.entities.find((o) => o._id === id)

	return order
}

export default ordersReducer
