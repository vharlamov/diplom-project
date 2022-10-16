import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import { generetaAuthError } from '../utils/generateAuthError'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
	? {
			entities: null,
			currentUser: null,
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isLogged: true,
			isAdmin: false,
			dataLoaded: false,
	  }
	: {
			entities: null,
			currentUser: null,
			isLoading: false,
			error: null,
			auth: null,
			isLogged: false,
			isAdmin: false,
			dataLoaded: false,
	  }

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersRequested: (state) => {
			state.isLoading = true
		},
		usersRecieved: (state, action) => {
			state.entities = action.payload
			state.dataLoaded = true
			state.isLoading = false
		},
		usersRequestFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		},
		authRequestSuccess: (state, action) => {
			console.log('auth', action.payload)
			state.currentUser = action.payload
			state.auth = { userId: action.payload.userId }
			state.isLogged = true
			state.isAdmin = action.payload.isAdmin
		},
		authRequestFailed: (state, action) => {
			state.error = action.payload
			state.isLogged = false
		},
		authAdmin: (state, action) => {
			state.isAdmin = action.payload.isAdmin
			state.currentUser = action.payload
		},
		userCreated: (state, action) => {
			state.entities.push(action.payload)
		},
		userLoggedOut: (state) => {
			state.currentUser = null
			state.isLogged = false
			state.auth = null
		},
		userUpdateRequested: (state) => {
			state.isLoading = true
		},
		userUpdateSuccessed: (state, action) => {
			if (state.entities) {
				state.entities[
					state.entities.findIndex((u) => u._id === action.payload._id)
				] = action.payload
			}
			state.currentUser = action.payload
		},
		authRequested: (state) => {
			state.error = null
		},
	},
})

const { reducer: usersReducer, actions } = usersSlice
const {
	authAdmin,
	usersRequested,
	usersRecieved,
	usersRequestFailed,
	authRequestFailed,
	authRequestSuccess,
	userLoggedOut,
	userUpdateSuccessed,
	userUpdateRequested,
} = actions

const authRequested = createAction('users/authRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const login =
	({ payload, redirect }) =>
	async (dispatch) => {
		const { email, password } = payload

		dispatch(authRequested())

		try {
			const data = await authService.login({ email, password })
			console.log('auth data', data)

			dispatch(authRequestSuccess(data.user))
			dispatch(authAdmin(data.user))
			localStorageService.setTokens(data)
			if (redirect) history.push(redirect)
		} catch (error) {
			const { code, message } = error.response.data
			if (code === 400) {
				const errorMessage = generetaAuthError(message)

				dispatch(authRequestFailed(errorMessage))
			} else {
				dispatch(authRequestFailed(error.message))
			}
		}
	}

export const signUp =
	({ payload, redirect }) =>
	async (dispatch) => {
		dispatch(authRequested())

		try {
			const data = await authService.register(payload)

			localStorageService.setTokens(data)

			dispatch(authRequestSuccess({ userId: data.userId }))

			if (redirect) history.push(redirect)
		} catch (error) {
			dispatch(authRequestFailed(error.message))
		}
	}

export const proofAdmin = (redirect) => async (dispatch) => {
	dispatch(authRequested())
	try {
		// const token = localStorageService.getAccessToken()
		const data = await authService.proof()
		console.log('proofAdmin data', data)
		dispatch(authAdmin(data))
		history.push(redirect)
	} catch (error) {
		dispatch(authRequestFailed(error.message))
	}
}

export const logOut = () => (dispatch) => {
	localStorageService.removeAuthData()
	dispatch(userLoggedOut())
	dispatch(authAdmin(false))
	history.push('/')
}

export const loadUsersList = () => async (dispatch) => {
	dispatch(usersRequested())
	try {
		const { content } = await userService.getUser()
		dispatch(usersRecieved(content))
	} catch (error) {
		dispatch(usersRequestFailed(error.message))
	}
}

export const updateUser = (payload) => async (dispatch) => {
	dispatch(userUpdateRequested())
	// console.log('currentUser payload', payload)
	delete payload._id
	try {
		const { content } = await userService.updateUser(payload)
		console.log('update user content', content)
		dispatch(userUpdateSuccessed(content))
	} catch (error) {
		dispatch(userUpdateFailed(error.message))
	}
}

export const getUsersList = () => (state) => state.users.entities
export const getCurrentUserData = () => (state) => {
	return state.users.entities
		? state.users.entities.find((u) => u._id === state.users.auth.userId)
		: null
}

export const getUserById = (userId) => (state) => {
	if (state.users.entities) {
		return state.users.entities.find((u) => u._id === userId)
	}
}

export const getIsLogged = () => (state) => {
	// console.log(state.users.isLogged)
	return state.users.isLogged
}
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getCurrentUser = () => (state) => state.users.currentUser
export const getAuthErrors = () => (state) => state.users.error
export const getIsAdmin = () => (state) => state.users.isAdmin

export default usersReducer
