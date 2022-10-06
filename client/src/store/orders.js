import { createAction, createSlice } from '@reduxjs/toolkit'
import orderService from '../services/order.service'
import usersReducer, { usersSlice } from './users'

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
			console.log('orders recieved', action.payload)
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
			state.entities.filter((e) => e._id === action.payload)
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
const orderRemoveFailed = createAction('orders/orderRemoveFailed')
const orderPatchReq = createAction('orders/orderPatchReq')
const orderPatchFailed = createAction('orders/orderPatchFailed')

const { actions: userActions } = usersSlice
const { userUpdateRequested, userUpdateSuccessed } = userActions

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
	// console.log('orders payload', payload)
	try {
		const { content } = await orderService.createOrder(payload)
		// console.log('orders users state', state.orders)
		dispatch(orderCreated(content))
		// 		const currentUser = state.users.currentUser
		// 		const userOrders = currentUser.orders ? currentUser.orders : []
		//
		// 		dispatch(
		// 			updateUser(payload.userId, {
		// 				orders: userOrders.unshift(content._id),
		// 			})
		// 		)
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

export const updateOrder = (id, payload) => async (state, dispatch) => {
	dispatch(orderPatchReq())
	// console.log('orders state.users', state.users)

	try {
		const { content } = await orderService.updateOrder(id, payload)
		dispatch(orderPatched(content))
		// console.log('orders content', content)
	} catch (e) {
		dispatch(orderPatchFailed(e.message))
	}
}

export const getOrdersList = () => (state) => {
	// console.log('getOrdersList', state.orders)
	return state.orders.entities
}

export const getCurrentOrder = () => (state) => state.orders.currentOrder

export const getOrdersLoadingStatus = () => (state) => {
	return state.orders.isLoading
}

export default ordersReducer
