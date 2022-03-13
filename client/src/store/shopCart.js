import { createSlice } from '@reduxjs/toolkit'
import localStorageService from '../services/localStorage.service'

const shcartSlice = createSlice({
	name: 'shCart',
	initialState: {
		entities: [],
	},
	reducers: {
		shcartCreated: (state, action) => {
			state.entities = action.payload
		},
		shcartUpdated: (state, action) => {
			state.entities = [...state.entities, action.payload]
		},
		shcartRemoved: (state, action) => {
			state.entities = state.entities.filter((p) => p !== action.payload)
		},
	},
})

const { actions, reducer: shcartReducer } = shcartSlice
const { shcartCreated, shcartRemoved, shcartUpdated } = actions

export const loadShcart = () => (dispatsh) => {
	const shCart = localStorageService.getShopCart()
	console.log('shCart', shCart)
	dispatsh(shcartCreated(shCart ? shCart : []))
}

export const addShcart = (payload) => (dispatsh) => {
	const sc = []
	dispatsh(shcartUpdated(payload))
	localStorageService.setShopCart(payload)
}

export const removeShcart = (payload) => (state, dispatsh) => {
	dispatsh(shcartRemoved(payload))
	// localStorageService.setShopCart(state.shCart.entities)
}

export const getShopCart = () => (state) => {
	console.log('state.shopcart', state.shCart)
	return state.shCart.entities
}

export default shcartReducer
