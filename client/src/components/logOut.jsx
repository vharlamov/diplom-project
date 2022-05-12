import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../services/auth.service'
import { logOut } from '../store/users'

const LogOut = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(logOut())
		authService.logout()
	}, [])

	return <h1>Loading</h1>
}

export default LogOut
