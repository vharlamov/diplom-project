import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import authService from '../services/auth.service'
import { logOut } from '../store/users'

const LogOut = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(logOut())
		authService.logout()
		history.push('/')
	}, [])

	return <h1>Loading</h1>
}

export default LogOut
