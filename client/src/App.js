import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/protectedRoute'
import AppLoader from './components/hoc/appLoader'
import LogOut from './components/logOut'
import Navbar from './components/Navbar'
import AdminPage from './pages/adminPage'
import ChangeCategory from './pages/changeCategory'
import Login from './pages/login'
import MainPage from './pages/mainPage'
import orderPage from './pages/orderPage'
import ProductPage from './pages/productPage'
import ShoppingCart from './pages/shcartPage'
import UserPage from './pages/userPage'
import authService from './services/auth.service'
import { getProductsList } from './store/products'
import { getCurrentUser, getIsAdmin, getIsLogged } from './store/users'

function App() {
	const isAdmin = useSelector(getIsAdmin())
	const isLogged = useSelector(getIsLogged())
	const prodList = useSelector(getProductsList())
	const currentUser = useSelector(getCurrentUser())
	// console.log('app currentUser', currentUser)

	return (
		<div className='container-fluid row-fluid d-flex flex-column mx-auto ms-0 me-0 h-100vh w-100vw'>
			<AppLoader>
				<Navbar
					isAdmin={isAdmin}
					isLogged={isLogged}
					currentUser={currentUser}
				/>
				<Switch>
					<Route path='/' exact component={MainPage} />
					<Route path='/login/:type?' component={Login} />
					<ProtectedRoute
						path='/admin/:add?/:edit?/:id?'
						component={isAdmin ? AdminPage : MainPage}
					/>
					<Route
						path='/product/:goods?/:id?'
						render={(props) => <UserPage prodList={prodList} />}
					/>
					<ProtectedRoute
						path='/changecategory'
						component={isAdmin ? ChangeCategory : MainPage}
					/>
					<Route path='/logout' component={LogOut} />
					<Route path='/shcart' component={ShoppingCart} />
					<Route path='/order' component={orderPage} />
				</Switch>
			</AppLoader>
		</div>
	)
}

export default App
