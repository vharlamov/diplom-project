import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import { generetaAuthError } from '../utils/generateAuthError'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
	? {
			entities: null,
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isLogged: true,
			dataLoaded: false,
	  }
	: {
			entities: null,
			isLoading: false,
			error: null,
			auth: null,
			isLogged: false,
			dataLoaded: false,
	  }

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersRequested: (state) => {
			state.isLoading = true
		},
		usersRecieved: (state, action) => {
			state.isLoading = false
			state.entities = action.payload
			state.dataLoaded = true
		},
		usersReqFailed: (state, action) => {
			state.error = action.payload
		},
		userCreated: (state, action) => {
			state.entities.push(action.payload)
		},
		userUpdatedSuccess: (state, action) => {
			state.entities[
				state.entities.findIndex((e) => e._id === action.payload._id)
			] = action.payload
		},
		userRemoved: (state, action) => {
			state.entities.filter((e) => e._id !== action.payload)
		},
		userLoggedOut: (state) => {
			state.entities = null
			state.isLogged = false
			state.auth = null
			state.dataLoaded = false
		},

		authRequestSuccess: (state, action) => {
			state.auth = action.payload
			state.isLogged = true
		},
		authRequestFailed: (state, action) => {
			state.auth = action.payload
		},
		authRequested: (state) => {
			state.error = null
		},
	},
})

const { actions, reducer: usersReducer } = usersSlice
const {
	usersRequested,
	usersRecieved,
	usersReqFailed,
	userCreated,
	userRemoved,
	userUpdatedSuccess,
	authRequested,
	authRequestSuccess,
	authRequestFailed,
	userLoggedOut,
} = actions

const userUpdateFailed = createAction('users/userUpdateFailed')
const userUpdateRequest = createAction('user/userUpdateRequest')
const removeUserRequested = createAction('user/removeUserRequested')

export const login = (payload, redirect) => async (dispatch) => {
	const { email, password } = payload
	dispatch(authRequested())

	try {
		const data = await authService.login({ email, password })
		dispatch(authRequestSuccess({ userId: data.userId }))
		localStorageService.setTokens(data)
		history.push(redirect)
	} catch (e) {
		const { code, message } = e.response.data.error

		if (code === 400) {
			const errorMessage = generetaAuthError(message)
			dispatch(authRequestFailed(errorMessage))
		} else {
			dispatch(authRequestFailed(e.message))
		}
	}
}

export const signUp = (payload) => async (dispatch) => {
	dispatch(authRequested())

	try {
		const data = await authService.register(payload)
		localStorageService.setTokens(data)
		dispatch(authRequestSuccess({ userId: data.userId }))
	} catch (e) {
		dispatch(authRequestFailed(e.message))
	}
}

export const logout = () => async (dispatch) => {
	localStorageService.removeAuthData()

	dispatch(userLoggedOut())

	history.push('/')
}

export const updateUser = (payload) => async (dispatch) => {
	dispatch(userUpdateRequest())

	try {
		const { content } = await userService.updateUser(payload)
		dispatch(userUpdatedSuccess(content))
		history.push(`/users/${content._id}`)
	} catch (e) {
		dispatch(userUpdateFailed(e.message))
	}
}

export const removeUser = (id) => async (dispatch) => {
	dispatch(removeUserRequested())

	try {
		const { content } = await userService.removeUser(id)
		dispatch(userRemoved(id))
	} catch (e) {
		dispatch(usersReqFailed(e.message))
	}
}

export const loadUsersList = () => async (dispatch) => {
	dispatch(usersRequested())
	try {
		const { content } = await userService.getUser()
		dispatch(usersRecieved(content))
	} catch (e) {
		dispatch(usersReqFailed(e.message))
	}
}

export const getUserList = () => (state) => state.users.entities
export const getCurrentUser = () => (state) => {
	return state.users.entities
		? state.users.entities.find((e) => e._id === state.users.auth.userId)
		: null
}
export const getUserById = (id) => (state) => {
	if (state.users.entities) {
		return state.users.entities.find((e) => e._id === id)
	}
}
export const getAuthErrors = () => (state) => state.users.error
export default usersReducer
