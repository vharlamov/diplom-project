import { createAction, createSlice } from '@reduxjs/toolkit'
import categoryService from '../services/category.service'

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		categoriesRequested: (state) => {
			state.isLoading = true
		},
		categoriesRecieved: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
			state.lastFetch = Date.now()
		},
		categoriesReqFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		},
		categoryCreated: (state, action) => {
			state.entities.push(action.payload)
		},
		categoryUpdated: (state, action) => {
			state.entities[
				state.entities.findIndex((c) => c._id === action.payload._id)
			] = action.payload
		},
		categoryRemoved: (state, action) => {
			state.entities = state.entities.filter((e) => e._id !== action.payload)
		},
	},
})

const { actions, reducer: categoriesReducer } = categoriesSlice
const {
	categoriesRecieved,
	categoriesRequested,
	categoriesReqFailed,
	categoryCreated,
	categoryRemoved,
	categoryUpdated,
} = actions

const addCategoryRequested = createAction('categories/addCategoryRequested')
const updateCategoryRequested = createAction(
	'categories/updateCategoryRequested'
)
const removeCategoryRequested = createAction(
	'categories/removeCategoryRequested'
)
const categoryUpdReqFailed = createAction('categories/categoryUpdReqFailed')

export const loadCategoriesList = () => async (dispatch) => {
	dispatch(categoriesRequested())

	try {
		const { content } = await categoryService.getCat()
		dispatch(categoriesRecieved(content))
	} catch (e) {
		console.log('category request error', e.message)
		dispatch(categoriesReqFailed(e.message))
	}
}

export const createCategory = (payload) => async (dispatch) => {
	dispatch(addCategoryRequested())

	console.log('add category')
	try {
		const { content } = await categoryService.createCat(payload)
		dispatch(categoryCreated(content))
	} catch (e) {
		dispatch(categoriesReqFailed(e.message))
	}
}

export const updateCategory = (id, payload) => async (dispatch) => {
	dispatch(updateCategoryRequested())

	try {
		const { content } = await categoryService.updateCat(id, payload)
		dispatch(categoryUpdated(content))
		console.log('update category')
	} catch (e) {
		dispatch(categoryUpdReqFailed(e.message))
	}
}

export const removeCategory = (id) => async (dispatch) => {
	dispatch(removeCategoryRequested())

	try {
		const { content } = await categoryService.removeCat(id)
		dispatch(categoryRemoved(id))
	} catch (e) {
		dispatch(categoriesReqFailed(e.message))
	}
}

export const getCategories = () => (state) => {
	return state.categories.entities
}
export const getCatLoadingStatus = () => (state) => state.categories.isLoading

export default categoriesReducer
