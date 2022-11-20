import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import OrderPage from '../pages/orderPage'
import { getCurrentUser } from '../store/users'
import OrderControl from './orderControl'
import OrderTable from './orderTable'

const OrdersList = () => {
	const user = useSelector(getCurrentUser())
	const isAdmin = user?.isAdmin
	const history = useHistory()
	const params = useParams()

	const exit = () => {
		isAdmin ? history.push('/admin') : history.push('/product/goods')
	}

	return (
		<div className='container'>
			{!params.id ? (
				<>
					<h1>Заказы</h1>
					<OrderTable />
					<div className='row justify-content-end w-100%'>
						<button className='btn btn-primary col-4' onClick={exit}>
							Выйти
						</button>
					</div>
				</>
			) : isAdmin ? (
				<OrderControl />
			) : (
				<OrderPage />
			)}
		</div>
	)
}

export default OrdersList
