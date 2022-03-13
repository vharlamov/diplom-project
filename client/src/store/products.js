import { createAction, createSlice } from '@reduxjs/toolkit'
import productService from '../services/product.service'

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		lastFetch: null,
		dataLoaded: false,
	},
	reducers: {
		productsRequested: (state) => {
			state.isLoading = true
		},

		productsRecieved: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
			state.dataLoaded = true
		},

		productsReqFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		},

		productCreated: (state, action) => {
			state.entities.push(action.payload)
		},

		productRemoved: (state, action) => {
			state.entities.filter((e) => e._id !== action.payload)
		},

		productUpdated: (state, action) => {
			state.entities[
				state.entities.findIndex((e) => e._id === action.payload._id)
			] = action.payload
		},
	},
})

const { actions, reducer: productsReducer } = productsSlice
const {
	productsRequested,
	productsRecieved,
	productsReqFailed,
	productCreated,
	productRemoved,
	productUpdated,
} = actions

const addProductRequested = createAction('products/addProductRequested')
const addProductReqFailed = createAction('products/addProductReqFailed')
const removeProductRequested = createAction('products/removeProductRequested')
const removeProductReqFailed = createAction('products/removeProductReqFailed')
const updateProductRequested = createAction('products/updateProductRequested')
const updateProductReqFailed = createAction('products/updateProductReqFailed')

export const loadProductsList = () => async (dispatch) => {
	dispatch(productsRequested())

	try {
		const { content } = await productService.getProduct()
		dispatch(productsRecieved(content))
	} catch (e) {
		dispatch(productsReqFailed(e.message))
	}
}

export const createProduct = (payload) => async (dispatch) => {
	dispatch(addProductRequested())

	try {
		const data = await productService.createProduct(payload)
		dispatch(productCreated(content))
	} catch (e) {
		dispatch(removeProductReqFailed(e))
	}
}

export const removeProduct = (id) => async (dispatch) => {
	dispatch(removeProductRequested())

	try {
		const { content } = await productService.removeProduct(id)
		dispatch(productRemoved(id))
	} catch (e) {
		dispatch(removeProductReqFailed(e.message))
	}
}

export const updateProduct = (id, payload) => async (dispatch) => {
	dispatch(updateProductRequested())

	try {
		const { content } = await productService.editProduct(id, payload)
		console.log('updateProduct data', data)
		dispatch(productUpdated(content))
	} catch (e) {
		dispatch(updateProductReqFailed(e.message))
	}
}

export const getProductsList = (chapter) => (state) => {
	if (chapter) {
		return state.products.entities
			? state.products.entities.filter((e) => e.chapter === chapter)
			: []
	}
	return state.products.entities ? state.products.entities : []
}

export const getProductById = (id) => (state) => {
	if (id) {
		const product = state.products.entities
			? state.products.entities.find((e) => e._id === id)
			: null

		return product
	} else return null
}

export const getProductsByCat = (payload) => (state) => {
	const { cat, subcat } = payload
	const sortByCat = state.products.entities.filter((e) => e.category === cat)
	const sortFinish = subcat
		? sortByCat.filter((e) => e.subcategory === subcat)
		: sortByCat

	return sortFinish
}

export const getDataStatus = () => (state) => state.products.dataLoaded
export const getProductsLoadingStatus = () => (state) =>
	state.products.isLoading

export default productsReducer
