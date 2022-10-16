import React from 'react'
import { useState } from 'react'

function UserMenu({ userName, className }) {
	const [dropMenu, setDropmenu] = useState(false)

	const toggleHandler = () => {
		setDropmenu((prev) => !prev)
		console.log('dropMenu', dropMenu)
	}

	return (
		<div className={className} aria-current='page'>
			<div
				className='mx-auto dropdown-toggle'
				id='dropdown'
				type='button'
				data-toggle='dropdown'
				aria-haspopup='true'
				aria-expanded='false'
				onClick={toggleHandler}
			>
				{userName}
			</div>
			<div
				className={'dropdown-menu dropdown-menu-right min-width-0'}
				aria-labelledby='dropdown'
			>
				<a className='dropdown-item' href='#'>
					Заказы
				</a>
				<a className='dropdown-item' href='#'>
					Выйти
				</a>
			</div>
		</div>
	)
}

export default UserMenu
