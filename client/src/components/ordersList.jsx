import React from 'react'
import { useSelector } from 'react-redux'
import { getOrdersList } from '../store/orders'

const OrdersList = () => {
	const orders = useSelector(getOrdersList())

	const columns = {}

	return <h1>OrdersList</h1>
}

export default OrdersList
