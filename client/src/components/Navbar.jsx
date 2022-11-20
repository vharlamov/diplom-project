import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getCurrentUser, logOut } from '../store/users'
import UserMenu from './userMenu'

const Navbar = ({ isAdmin, isLogged }) => {
	const currentUser = useSelector(getCurrentUser())
	const [logged, setLogged] = useState({
		isLogged,
		isAdmin,
	})
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		setLogged((prev) => ({ ...prev, isAdmin, isLogged }))
	}, [isAdmin, isLogged])

	const handleLogOut = () => {
		dispatch(logOut())
		setLogged((prev) => ({ ...prev, isAdmin: false, isLogged: false }))
		history.push('/')
	}

	return (
		<nav className='navbar bg-dark mb-3 sticky-top'>
			<ul className='nav row cols-sm-1 cols-md-2 text-center justify-content-between w-100'>
				{/* Первая колонка из 3 линков */}
				<div className='row col-md-6 col-sm-12 cols-3 justify-content-start'>
					<li className='nav-item col-4'>
						<Link to='/' className='nav-link ' aria-current='page'>
							Главная
						</Link>
					</li>
					<li className='nav-item col-4'>
						<Link to='/product/goods' className='nav-link ' aria-current='page'>
							Каталог
						</Link>
					</li>
					<li className='nav-item col-4'>
						<Link to='/education' className='nav-link ' aria-current='page'>
							Обучение
						</Link>
					</li>
				</div>
				{/* вторая колонка из 2 линков */}
				<div className='row  col-md-4 col-sm-12 cols-2 text-center justify-content-end'>
					<div className='col-6'>
						{isAdmin ? (
							<li className='nav-item'>
								<Link to='/admin' className='nav-link ' aria-current='page'>
									Админка
								</Link>
							</li>
						) : (
							<li className='nav-item'>
								<Link to='/shcart' className='nav-link ' aria-current='page'>
									<i
										className='bi bi-cart-check-fill'
										style={{ width: '60px', height: '60px' }}
									></i>
								</Link>
							</li>
						)}
					</div>

					<div className='col-6'>
						<li className='nav-item me-5'>
							{currentUser ? (
								<UserMenu
									userName={currentUser.name}
									className='nav-link '
									aria-current='page'
									handleLogOut={handleLogOut}
									isAdmin={isAdmin}
								/>
							) : (
								<Link
									to='/login'
									className='nav-link '
									aria-current='page'
									onClick={handleLogOut}
								>
									Войти
								</Link>
							)}
						</li>
					</div>
				</div>
			</ul>
		</nav>
	)
}

export default Navbar
