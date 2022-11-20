import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import config from '../config.js'
import { getOrdersList, removeOrder } from '../store/orders.js'
import { getProductsList } from '../store/products.js'
import { getUsersList, getCurrentUser, updateUser } from '../store/users.js'
import dateFormat from '../utils/dateFormat.js'
import Table from './common/table/table'

const OrderTable = () => {
	const orders = useSelector(getOrdersList())

	const [sorted, setSorted] = useState(orders)
	const history = useHistory()
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUser())
	const isAdmin = currentUser?.isAdmin
	const users = useSelector(getUsersList())

	const products = useSelector(getProductsList())
	const statusText = ['Принято', 'В работе', 'Закрыто']
	const statusColor = ['danger', 'success', 'secondary']

	useEffect(() => {
		setSorted(orders)
	}, [orders])

	const onSort = (sortData, dir) => {
		const sortedList = sortordersByOne(orders, sortData, dir)

		setSorted(sortedList)
	}

	const getUserName = (id) => {
		if (isAdmin) {
			const user = users.find((u) => u._id === id)
			return user.name
		}
		return currentUser.name
	}

	const columns = {
		createdAt: {
			path: 'createdAt',
			name: 'Создан',
			component: (order) => dateFormat(order.createdAt),
		},
		updatedAt: {
			path: 'updatedAt',
			name: 'Изменен',
			component: (order) => dateFormat(order.updatedAt),
		},
		user: {
			path: 'costAmount',
			name: 'Покупатель',
			component: (order) => getUserName(order.userId),
		},
		costAmount: {
			path: 'costAmount',
			name: 'Стоимость',
			component: (order) => getOrderSum(order.products),
		},
		status: {
			path: 'status',
			name: 'Статус',
			component: (order) => (
				<span className={`text-${statusColor[order.status]}`}>
					<b>{statusText[order.status]}</b>
				</span>
			),
		},
		delete: isAdmin
			? {
					name: 'Удалить',
					component: (order) => (
						<button
							className='btn btn-danger btn-sm ms-1 mb-1'
							onClick={() => handleDelete(order._id)}
						>
							<i className='bi bi-x-lg'></i>
						</button>
					),
			  }
			: null,
	}
	const getOrderSum = (prods) => {
		const sum = prods
			.map((p) => {
				return {
					...products.find((pr) => pr._id === p._id),
					quantity: p.quantity,
				}
			})
			.reduce((acc, item) => acc + item.price * item.quantity, 0)

		return sum
	}

	function handleDelete(id) {
		const order = orders.find((o) => o._id === id)
		const user = users.find((u) => u._id === order.userId)
		const updOrders = user.orders.filter((uo) => uo !== id)
		const updUser = { ...user, orders: updOrders }

		dispatch(removeOrder(id))
		dispatch(updateUser(order.userId, updUser))
	}

	const selectOrder = (id) => {
		history.push(`/order/${id}`)
	}

	if (!isAdmin) {
		delete columns.delete
	}

	return (
		<>
			<Table
				data={sorted}
				columns={columns}
				onSort={onSort}
				selectItem={selectOrder}
			/>
		</>
	)
}

export default OrderTable
