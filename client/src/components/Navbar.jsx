import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getIsAdmin, getIsLogged, logOut } from '../store/users'

const Navbar = () => {
	const isLogged = useSelector(getIsLogged())
	const isAdmin = useSelector(getIsAdmin())
	const dispatch = useDispatch()
	const history = useHistory()
	// console.log('isAdmin', isAdmin)

	const handleLogOut = () => {
		dispatch(logOut())
		history.push('/ceramic')
	}

	return (
		<nav className='navbar bg-dark mb-3 sticky-top'>
			<ul className='nav flex-row justify-content-between'>
				<div className='d-flex flex-row'>
					<li className='nav-item'>
						<Link to='/' className='nav-link ' aria-current='page'>
							Главная
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							to='/product/ceramics'
							className='nav-link '
							aria-current='page'
						>
							Керамика
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							to='/product/epoxide'
							className='nav-link '
							aria-current='page'
						>
							Эпоксидка
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/education' className='nav-link ' aria-current='page'>
							Обучение
						</Link>
					</li>
				</div>
				<div className='d-flex flex-row justify-content-end'>
					{isAdmin ? (
						<li className='nav-item'>
							<Link to='/admin' className='nav-link ' aria-current='page'>
								Админка
							</Link>
						</li>
					) : (
						<li className='nav-item'>
							<Link to='/shcart' className='nav-link ' aria-current='page'>
								Корзина
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
							{isLogged ? 'Выйти' : 'Войти'}
						</Link>
					</li>
				</div>
			</ul>
		</nav>
	)
}

export default Navbar
