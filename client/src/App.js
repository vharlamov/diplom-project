import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AppLoader from './components/hoc/appLoader'
import LogOut from './components/logOut'
import Navbar from './components/Navbar'
import AdminPage from './pages/adminPage'
import ChangeCategory from './pages/changeCategory'
import EducationPage from './pages/educationPage'
import Login from './pages/login'
import MainPage from './pages/mainPage'
import ShoppingCart from './pages/shcartPage'
import UserPage from './pages/userPage'

function App() {
	return (
		<div className='container-fluid row-fluid d-flex flex-column mx-auto ms-0 me-0 h-100vh w-100vw'>
			<AppLoader>
				<Navbar />
				<Switch>
					<Route path='/' exact component={MainPage} />
					<Route path='/login/:type?' component={Login} />
					<Route path='/admin/:add?/:id?' component={AdminPage} />
					<Route path='/product/:chapter?/:id?' component={UserPage} />
					<Route path='/changecategory' component={ChangeCategory} />
					<Route path='/logout' component={LogOut} />
					<Route path='/shcart' component={ShoppingCart} />
				</Switch>
			</AppLoader>
		</div>
	)
}

export default App
