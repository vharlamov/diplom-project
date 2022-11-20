import { createSlice } from '@reduxjs/toolkit'
import localStorageService from '../services/localStorage.service'

const shcartSlice = createSlice({
	name: 'shCart',
	initialState: {
		entities: [],
	},
	reducers: {
		shcartUpdated: (state, action) => {
			state.entities = action.payload
		},
		shcartRemoved: (state, action) => {
			state.entities = state.entities.filter((p) => p !== action.payload)
		},
		shCartCleared: (state) => {
			state.entities = []
		},
	},
})

const { actions, reducer: shcartReducer } = shcartSlice
const { shcartCreated, shcartRemoved, shcartUpdated, shCartCleared } = actions

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
	localStorageService.setShopCart(state.shCart.entities)
}

export const clearShcart = () => (dispatch) => {
	dispatch(shCartCleared())
	localStorageService.removeShopCart()
}

export const getShopCart = () => (state) => {
	return state.shCart.entities
}

export default shcartReducer
