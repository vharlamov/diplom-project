import { createAction, createSlice } from '@reduxjs/toolkit'
import subcategoryService from '../services/subcategory.service'
import { updateCategory } from './categories'

const subcatSlice = createSlice({
	name: 'subcategories',
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		subcatsRequested: (state) => {
			state.isLoading = true
		},
		subcatsRecieved: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
			state.lastFetch = Date.now()
		},
		subcatsReqFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		},
		subcatCreated: (state, action) => {
			state.entities.push(action.payload)
		},
		subcatRemoved: (state, action) => {
			state.entities.filter((e) => e._id !== action.payload)
		},
	},
})

const { actions, reducer: subcatsReducer } = subcatSlice
const {
	subcatsRecieved,
	subcatsRequested,
	subcatsReqFailed,
	subcatCreated,
	subcatRemoved,
} = actions

const addSubcatRequested = createAction('categories/addSubcatRequested')
const removeSubcatRequested = createAction('categories/removeSubcatRequested')

export const loadSubcatList = (chapter) => async (dispatch) => {
	dispatch(subcatsRequested())

	try {
		const { content } = await subcategoryService.getSubcat(chapter)
		dispatch(subcatsRecieved(content))
	} catch (e) {
		dispatch(subcatsReqFailed(e.message))
	}
}

export const createSubcat = (payload) => async (dispatch) => {
	dispatch(addSubcatRequested())

	try {
		const { content } = await subcategoryService.createSubcat(payload)
		console.log('subcat create content', content)
		dispatch(subcatCreated(content))
		// dispatch(updateCategory())
	} catch (e) {
		dispatch(subcatsReqFailed(e.message))
	}
}

export const removeSubcat = (id) => async (dispatch) => {
	dispatch(removeSubcatRequested())

	try {
		const { content } = await subcategoryService.removeSubcat(id)
		dispatch(subcatRemoved(id))
	} catch (e) {
		dispatch(subcatsReqFailed(e.message))
	}
}

export const getSubcategories = () => (state) => state.subcategories.entities
export const getSubcatLoadingStatus = () => (state) =>
	state.subcategories.isLoading

export default subcatsReducer
