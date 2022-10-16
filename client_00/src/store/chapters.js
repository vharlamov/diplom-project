import { createSlice, createAction } from '@reduxjs/toolkit'
import chapterService from '../services/chapter.service'

const chapterSlice = createSlice({
	name: 'chapters',
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		chapterRequested: (state) => {
			state.isLoading = true
		},

		chapterRecieved: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
			state.lastFetch = Date.now()
		},

		chapterReqFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		},

		chapterCreated: (state, action) => {
			state.entities.push(action.payload)
		},

		chapterUpdated: (state, action) => {
			state.entities[
				state.entities.findIndex((c) => c._id === action.payload._id)
			] = action.payload
		},

		chapterRemoved: (state, action) => {
			state.entities = state.entities.filter((c) => c._id !== action.payload)
		},
	},
})

const { actions, reducer: chaptersReducer } = chapterSlice
const {
	chapterRequested,
	chapterRecieved,
	chapterReqFailed,
	chapterCreated,
	chapterUpdated,
	chapterRemoved,
} = actions

const chapterCreateRequested = createAction('chapters/chapterCreateRequested')
const chapterCreateFailed = createAction('chapters/chapterCreateFailed')
const chapterUpdateRequested = createAction('chapters/chapterUpdateRequested')
const chapterUpdateFailed = createAction('chapters/chapterUpdateFailed')
const chapterRemoveRequested = createAction('chapters/chapterRemoveRequested')
const chapterRemoveFailed = createAction('chapters/chapterRemoveFailed')

export const loadChaptersList = () => async (dispatch) => {
	dispatch(chapterRequested())

	try {
		const { content } = await chapterService.getChapter()
		dispatch(chapterRecieved(content))
	} catch (e) {
		console.log('chapter request error', e.message)
		dispatch(chapterReqFailed(e.message))
	}
}

export const createChapter = (payload) => async (dispatch) => {
	dispatch(chapterCreateRequested())
	// console.log('createChapter', payload)

	try {
		const { content } = await chapterService.createChapter(payload)
		dispatch(chapterCreated(content))
	} catch (e) {
		console.log('chapter create error', e.message)
		dispatch(chapterCreateFailed(e.message))
	}
}

export const updateChapter = (id, payload) => async (dispatch) => {
	dispatch(chapterUpdateRequested())
	console.log('store updateChapter run')

	try {
		const { content } = await chapterService.updateChapter(id, payload)
		console.log('store updateChapter content', content)
		dispatch(chapterUpdated(content))
	} catch (e) {
		console.log('chapter update error', e.message)
		dispatch(chapterUpdateFailed(e.message))
	}
}

export const removeChapter = (id) => async (dispatch) => {
	dispatch(chapterRemoveRequested())

	try {
		const { content } = await chapterService.removeChapter(id)
		dispatch(chapterRemoved(id))
	} catch (e) {
		console.log('chapter remove error', e.message)
		dispatch(chapterRemoveFailed(e.message))
	}
}

export const getChapters = () => (state) => {
	return state.chapters.entities
}

export const getChaptersLoading = () => (state) => {
	return state.chapters.isLoading
}

export default chaptersReducer
