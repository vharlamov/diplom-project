import { createSlice } from '@reduxjs/toolkit'
import localStorageService from '../services/localStorage.service'

const shcartSlice = createSlice({
	name: 'shCart',
	initialState: {
		entities: [],
	},
	reducers: {
		// shcartCreated: (state, action) => {
		// 	state.entities = action.payload
		// },
		shcartUpdated: (state, action) => {
			state.entities = action.payload
		},
		shcartRemoved: (state, action) => {
			state.entities = state.entities.filter((p) => p !== action.payload)
		},
	},
})

const { actions, reducer: shcartReducer } = shcartSlice
const { shcartCreated, shcartRemoved, shcartUpdated } = actions

export const loadShcart = () => (dispatch) => {
	const shCart = JSON.parse(localStorageService.getShopCart())
	dispatch(shcartUpdated(shCart && shCart.length ? shCart : []))
}

export const updateShcart = (payload) => (dispatch) => {
	const sc = []
	dispatch(shcartUpdated(payload))
	localStorageService.setShopCart(JSON.stringify(payload))
}

export const removeShcart = (payload) => (state, dispatch) => {
	dispatch(shcartRemoved(payload))
	// localStorageService.setShopCart(state.shCart.entities)
}

export const getShopCart = () => (state) => {
	// console.log('state.shopcart', state.shCart)
	return state.shCart.entities
}

export default shcartReducer
