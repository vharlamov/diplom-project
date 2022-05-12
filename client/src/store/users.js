import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import { generetaAuthError } from '../utils/generateAuthError'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
	? {
			entities: [],
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isLogged: true,
			isAdmin: false,
			dataLoaded: false,
	  }
	: {
			entities: [],
			isLoading: false,
			error: null,
			auth: null,
			isLogged: false,
			isAdmin: false,
			dataLoaded: false,
	  }

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersRequested: (state) => {
			state.isLoading = true
		},
		usersReceved: (state, action) => {
			state.entities = action.payload
			state.dataLoaded = true
			state.isLoading = false
		},
		usersRequestFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		},
		authRequestSuccess: (state, action) => {
			state.auth = action.payload
			state.isLogged = true
		},
		authRequestFailed: (state, action) => {
			state.error = action.payload
		},
		authAdmin: (state, action) => {
			state.isAdmin = action.payload
		},
		userCreated: (state, action) => {
			state.entities.push(action.payload)
		},
		userLoggedOut: (state) => {
			state.isLogged = false
			state.auth = null
		},
		userUpdateSuccessed: (state, action) => {
			state.entities[
				state.entities.findIndex((u) => u._id === action.payload._id)
			] = action.payload
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
	usersReceved,
	usersRequestFailed,
	authRequestFailed,
	authRequestSuccess,
	userLoggedOut,
	userUpdateSuccessed,
} = actions

const authRequested = createAction('users/authRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')

export const login =
	({ payload, redirect }) =>
	async (dispatch) => {
		const { email, password } = payload

		dispatch(authRequested())

		try {
			const data = await authService.login({ email, password })
			const { isAdmin } = await authService.proof()
			dispatch(authRequestSuccess({ userId: data.userId }))
			console.log('isAdmin in users', isAdmin)
			dispatch(authAdmin(isAdmin))
			localStorageService.setTokens(data)
			history.push('/')
		} catch (error) {
			console.log('error in users', error.response)
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
			history.push(redirect)
		} catch (error) {
			dispatch(authRequestFailed(error.message))
		}
	}

// export const proofAdmin = (redirect) => async (dispatch) => {
// 	dispatch(authRequested())
// 	try {
// 		const token = localStorageService.getAccessToken()
// 		const data = await authService.proof(token)
//
// 		dispatch(authRequestSuccess({ isAdmin: data.isAdmin }))
// 		history.push(redirect)
// 	} catch (error) {
// 		dispatch(authRequestFailed(error.message))
// 	}
// }

export const logOut = () => (dispatch) => {
	localStorageService.removeAuthData()
	dispatch(userLoggedOut())
	dispatch(authAdmin(false))
	history.push('/')
}

// export const loadUsersList = () => async (dispatch) => {
// 	dispatch(usersRequested())
// 	try {
// 		const { content } = await userService.getUser()
// 		dispatch(usersReceved(content))
// 	} catch (error) {
// 		dispatch(usersRequestFailed(error.message))
// 	}
// }

export const loadUser = () => async (dispatch) => {
	dispatch(usersRequested())
	try {
		const { content } = await userService.getUser()
		dispatch(usersReceved(content))
	} catch (error) {
		dispatch(usersRequestFailed(error.message))
	}
}

export const updateUser = (payload) => async (dispatch) => {
	dispatch(userUpdateRequested())
	try {
		const { content } = await userService.update(payload)
		dispatch(userUpdateSuccessed(content))
		history.push(`/users/${content._id}`)
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
export const getCurrentUserId = () => (state) => state.users.auth.userId
export const getAuthErrors = () => (state) => state.users.error
export const getIsAdmin = () => (state) => state.users.isAdmin

export default usersReducer
