import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getCurrentUser, logOut } from '../store/users'

const Navbar = ({ isAdmin, isLogged }) => {
	const currentUser = useSelector(getCurrentUser())
	// console.log('navbar currentUser', currentUser)
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
		<nav className='navbar d-flex bg-dark mb-3 sticky-top'>
			<ul className='nav d-flex justify-content-between w-100'>
				<div className='col d-inline-flex'>
					<li className='nav-item'>
						<Link to='/' className='nav-link ' aria-current='page'>
							Главная
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/product/goods' className='nav-link ' aria-current='page'>
							Каталог
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/education' className='nav-link ' aria-current='page'>
							Обучение
						</Link>
					</li>
				</div>
				<div className='col d-flex flex-row justify-content-end'>
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
					<li className='nav-item'>
						<Link
							to={isLogged ? '/logout' : '/login'}
							className='nav-link '
							aria-current='page'
							onClick={handleLogOut}
						>
							{currentUser ? currentUser.name : 'Войти'}
						</Link>
					</li>
				</div>
			</ul>
		</nav>
	)
}

export default Navbar
