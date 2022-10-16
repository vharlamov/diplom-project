import React from 'react'
import { useState } from 'react'

function UserMenu({ userName, handleLogOut, isAdmin }) {
	const [show, setShow] = useState(false)

	const toggleHandler = () => {
		setShow((prev) => !prev)
		console.log('dropMenu', show)
	}

	const handleOrders = () => {
		toggleHandler()
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
