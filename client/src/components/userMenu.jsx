import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrdersList } from '../store/orders'
import { getCurrentUser } from '../store/users'

function UserMenu({ userName, handleLogOut, isAdmin }) {
	const [show, setShow] = useState(false)
	const history = useHistory()
	const user = useSelector(getCurrentUser())
	const dispatch = useDispatch()

	useEffect(() => {
		if (!user.isAdmin) {
			dispatch(loadOrdersList())
		}
	}, [])

	const toggleHandler = () => {
		setShow((prev) => !prev)
	}

	const handleOrders = () => {
		toggleHandler()
		if (!user.isAdmin) {
			dispatch(loadOrdersList(user.orders))
		}
		history.push('/order')
	}

	return (
		<div className='nav-link dropdown show' aria-current='page'>
			<div
				className='mx-auto dropdown-toggle'
				id='dropdownMenuButton'
				type='button'
				data-toggle='dropdown'
				aria-haspopup='true'
				aria-expanded='false'
				onClick={toggleHandler}
			>
				{userName}
			</div>
			<div
				className={
					'dropdown-menu dropdown-menu-right min-width-0' +
					(show ? ' show' : '')
				}
				aria-labelledby='dropdownMenuButton'
			>
				{!isAdmin && (
					<div className='dropdown-item cursor-pointer' onClick={handleOrders}>
						Заказы
					</div>
				)}
				<div className='dropdown-item' onClick={handleLogOut}>
					Выйти
				</div>
			</div>
		</div>
	)
}

export default UserMenu
