import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getIsAdmin } from '../../store/users'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
	const isAdmin = useSelector(getIsAdmin())

	return (
		<Route
			{...rest}
			render={(props) => {
				if (!isAdmin) {
					return <Redirect to='/' />
				}
				return Component ? <Component {...props} /> : children
			}}
		/>
	)
}

export default ProtectedRoute
