import React from 'react'
import { useSelector } from 'react-redux'
import { getOrdersList } from '../store/orders'
import { getCurrentUser } from '../store/users'

const OrdersList = () => {
	const user = useSelector(getCurrentUser())
	const orders = useSelector(getOrdersList())
	console.log('order list', orders)

	const columns = {}

	return 'orders'
}

export default OrdersList
