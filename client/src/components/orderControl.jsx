import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import config from '../config'
import { getOrderById, updateOrder } from '../store/orders'
import { getProductsList } from '../store/products'
import { getUserById } from '../store/users'
import dateFormat from '../utils/dateFormat'
import history from '../utils/history'
import TableBody from './common/table/tableBody'
import TableHeader from './common/table/tableHeader'

const OrderControl = () => {
	const id = useParams().id
	const order = useSelector(getOrderById(id))
	const initialState = {
		status: order ? order.status : null,
		products: order ? order.products : [],
		comment: order ? order.comment : '',
		costAmount: 0,
	}

	const [currentOrder, setCurrentOrder] = useState(initialState)
	const dispatch = useDispatch()

	useEffect(() => {
		setCurrentOrder(initialState)
		getOrderSum()
	}, [order])

	useEffect(() => {
		getOrderSum()
	}, [currentOrder.products])

	const user = useSelector(getUserById(order?.userId))

	const products = useSelector(getProductsList())
	const orderProds = order?.products.map((op) => op._id)
	const status = ['Принят', 'В обработке', 'Закрыт']
	const color = ['danger', 'success', 'secondary']

	const filterProducts = () => {
		return products?.filter((p) => orderProds?.includes(p._id))
	}

	const getProductQuantity = (ind) => {
		return currentOrder.products[ind]?.quantity
	}

	const rebuildProducts = () => {
		const filtered = filterProducts()
		const rebuilded = filtered.map((f, i) => ({
			...f,
			quantity: getProductQuantity(i),
			value: i,
		}))
		return rebuilded
	}

	function getOrderSum() {
		const sum = rebuildProducts().reduce((acc, item, i) => {
			acc += item.price * item.quantity
			return acc
		}, 0)
		setCurrentOrder((prev) => ({ ...prev, costAmount: sum }))
		return sum
	}

	const increment = (value) => {
		const prod = currentOrder.products[value]
		const updProd = { ...prod, quantity: prod.quantity + 1 }
		const prods = [...currentOrder.products]
		prods[value] = updProd
		setCurrentOrder((prev) => ({ ...prev, products: prods }))
		rebuildProducts(value)
	}

	const decrement = (value) => {
		const prod = currentOrder.products[value]
		if (prod.quantity > 0) {
			const updProd = { ...prod, quantity: prod.quantity - 1 }
			const prods = [...currentOrder.products]
			prods[value] = updProd
			setCurrentOrder((prev) => ({ ...prev, products: prods }))
			rebuildProducts(value)
		}
	}

	const changeStatus = (status) => {
		setCurrentOrder((prev) => ({ ...prev, status }))
	}

	const exit = () => {
		history.push('/order')
	}

	const reset = () => {
		setCurrentOrder(initialState)
	}

	const submit = () => {
		dispatch(updateOrder(id, currentOrder))
		exit()
	}

	const columns = {
		image: {
			path: 'image',
			name: '',
			component: (product) => {
				return (
					<img
						src={config + 'uploads/' + product.images[0]}
						className='img-thumbnail col-12'
						style={{ maxWidth: '90px' }}
					/>
				)
			},
		},
		title: {
			path: 'title',
			name: 'Название',
			component: (product) => (
				<Link to={`/admin/edit/${product._id}`}>{product.title}</Link>
			),
			class: 'col-3 ms-2 ps-2',
		},
		price: {
			path: 'price',
			name: 'Цена',
			class: 'col-1 ms-0 text-center',
		},
		quantity: {
			path: 'quantity',
			name: 'Кол-во',
			component: (product) => currentOrder.products[product.value]?.quantity,
			class: 'col-2 ms-2 ps-2 text-center',
		},
		increment: {
			component: (product) => (
				<div className='column '>
					<button
						className='btn btn-secondary btn-sm ms-1 mb-1'
						onClick={() => increment(product.value)}
					>
						<i className='bi bi-plus-lg'></i>
					</button>
					<button
						className='btn btn-secondary btn-sm ms-1 mb-1'
						onClick={() => decrement(product.value)}
					>
						<i className='bi bi-dash-lg'></i>
					</button>
					<button
						className='btn btn-danger btn-sm ms-1 mb-1'
						onClick={() => deleteProd(product._id)}
					>
						<i className='bi bi-x-lg'></i>
					</button>
				</div>
			),
			class: 'col-3 ms-0',
		},
	}

	return (
		<div className='container mt-5' style={{ maxWidth: '800px' }}>
			{order && user ? (
				<div className='row w-100%'>
					<div className='shadow p-4'>
						<h4>
							<span>Пользователь: </span>
							{user.name}
						</h4>
						<h4>
							<span>Почта: </span>
							{user.email}
						</h4>
						<h4>
							<span>Статус: </span>
							<span className={`text-${color[[currentOrder.status]]}`}>
								{status[[currentOrder.status]]}
							</span>
						</h4>
						<div className='row cols-2 my-4'>
							<h6 className='col'>
								<span>Создан: </span>
								{dateFormat(order.createdAt)}
							</h6>
							<h6 className='col'>
								<span>Изменён: </span>
								{dateFormat(order.updatedAt)}
							</h6>
						</div>
						<hr />
						<table>
							<TableHeader {...{ columns }} />
							<TableBody {...{ columns, data: rebuildProducts() }} />
						</table>
						<p>{order.comment}</p>
						<div className='row text-end justify-content-end'>
							<h3 className='col-6'>
								Сумма заказа: {currentOrder.costAmount} руб.
							</h3>
						</div>
						<hr />
						<div className='row gy-2'>
							<button
								className='btn btn-danger col mx-2'
								onClick={() => changeStatus(0)}
							>
								{status[0]}
							</button>
							<button
								className='btn btn-success col mx-2'
								onClick={() => changeStatus(1)}
							>
								{status[1]}
							</button>
							<button
								className='btn btn-secondary col mx-2'
								onClick={() => changeStatus(2)}
							>
								{status[2]}
							</button>
						</div>
						<hr />
						<div className='row gy-2'>
							<button className='btn btn-secondary col mx-2' onClick={exit}>
								Выйти
							</button>
							<button className='btn btn-warning col mx-2' onClick={reset}>
								Сбросить
							</button>
							<button className='btn btn-primary col mx-2' onClick={submit}>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			) : (
				<h5>Loading...</h5>
			)}
		</div>
	)
}

export default OrderControl
