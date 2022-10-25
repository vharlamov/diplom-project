import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../../client/src/components/common/protectedRoute'
import AppLoader from '../../client/src/components/hoc/appLoader'
import LogOut from '../../client/src/components/logOut'
import Navbar from '../../client/src/components/Navbar'
import AdminPage from '../../client/src/pages/adminPage'
import ChangeCategory from '../../client/src/pages/changeCategory'
import Login from '../../client/src/pages/login'
import MainPage from '../../client/src/pages/mainPage'
import orderPage from '../../client/src/pages/orderPage'
import ProductPage from '../../client/src/pages/productPage'
import ShoppingCart from '../../client/src/pages/shcartPage'
import UserPage from '../../client/src/pages/userPage'
import authService from '../../client/src/services/auth.service'
import { getProductsList } from '../../client/src/store/products'
import {
	getCurrentUser,
	getIsAdmin,
	getIsLogged,
} from '../../client/src/store/users'
import OrdersList from './components/ordersList'

function App() {
	const isAdmin = useSelector(getIsAdmin())
	const isLogged = useSelector(getIsLogged())
	const prodList = useSelector(getProductsList())
	const currentUser = useSelector(getCurrentUser())

	return (
		<div
			className='container d-flex flex-column mx-auto h-100vh w-100vw'
			style={{ maxWidth: '1000px', margin: '0 auto' }}
		>
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
					<Route path='/order' component={OrdersList} />
				</Switch>
			</AppLoader>
		</div>
	)
}

export default App
