import { clearShcart, getShopCart } from '../store/shopCart'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, updateUser } from '../store/users'
import TableBody from '../components/common/table/tableBody'
import { getProductsList } from '../store/products'
import { useEffect, useState } from 'react'
import config from '../config.js'
import TextAreaField from '../components/common/form/textAreaField'
import { createOrder, getOrderById, getOrdersList } from '../store/orders'
import history from '../utils/history'
import { useParams } from 'react-router-dom'
import dateFormat from '../utils/dateFormat'

const OrderPage = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUser())
	const shopCart = useSelector(getShopCart())
	const products = useSelector(getProductsList())
	const currentOrders = useSelector(getOrdersList())
	const id = useParams().id
	const currentOrder = useSelector(getOrderById(id))
	const [shСart, setShcart] = useState(shopCart)
	const [user, setUser] = useState(currentUser)
	const status = ['Принят', 'В обработке', 'Закрыт']
	const color = ['danger', 'success', 'secondary']

	const initOrder = {
		userId: currentUser?._id,
		status: currentOrder?.status || 0,
		products: id ? currentOrder?.products : shСart,
		comment: currentOrder?.comment,
		costAmount: currentOrder?.costAmount || 0,
	}
	const [order, setOrder] = useState(initOrder)
	const selectProds = order.products?.map((item) => {
		const product = products.find((p) => p._id === item._id)
		return {
			...product,
			quantity: item.quantity,
			price: product.price,
		}
	})

	useEffect(() => {
		setOrder(initOrder)
		getOrderSum()
	}, [])

	function getOrderSum() {
		const sum = selectProds?.reduce((acc, item) => {
			acc += item.price * item.quantity
			return acc
		}, 0)
		setOrder((prev) => ({ ...prev, costAmount: sum }))
		return sum
	}

	useEffect(() => {
		if (currentOrder) {
			const orders = currentUser?.orders || []
			let updOrders = [...orders]
			updOrders.unshift(currentOrder._id)
			const updatedUser = { ...user, orders: updOrders }
			dispatch(updateUser(currentUser._id, updatedUser))
		}
	}, [currentOrders])

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
			component: (product) => product.title,
			class: 'col-3 ms-2 ps-2',
		},
		quantity: {
			path: 'quantity',
			name: 'Кол-во',
			class: 'col-2 ms-2 ps-2 text-center',
		},
		price: {
			path: 'price',
			name: 'Цена',
			component: (product) => `${product.price} руб`,
			class: 'col-1 ms-0 text-center',
		},
	}

	const handleComment = ({ value }) => {
		setOrder((prev) => ({ ...prev, comment: value }))
	}

	const handleExit = () => {
		id ? history.push('/order') : history.push('/product/goods')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const orderId = await dispatch(createOrder(order))
		const userOrders = currentOrders.filter((o) => o.userId === user._id)
		userOrders.push(orderId)
		setUser((prev) => ({ ...prev, orders: userOrders }))
		dispatch(updateUser(user._id, { orders: userOrders }))
		dispatch(clearShcart())

		handleExit()
	}

	return (
		<div className='container mt-5' style={{ maxWidth: '800px' }}>
			{currentOrder || shopCart ? (
				<div className='row w-100%'>
					<div className='shadow p-4'>
						<h1>Ваш заказ:</h1>
						{id && (
							<h4>
								<span>Статус: </span>
								<span className={`text-${color[[currentOrder?.status]]}`}>
									{status[[currentOrder.status]]}
								</span>
							</h4>
						)}
						{currentUser ? (
							<>
								<div>
									<h5 className='mb-0 width-4'>Имя: {currentUser?.name}</h5>
									<h5>Email: {currentUser?.email}</h5>
								</div>
								{id && (
									<div className='row cols-2 my-4'>
										<h6 className='col'>
											<span>Создан: </span>
											{dateFormat(currentOrder.createdAt)}
										</h6>
										<h6 className='col'>
											<span>Изменён: </span>
											{dateFormat(currentOrder.updatedAt)}
										</h6>
									</div>
								)}
							</>
						) : (
							<p className='text-danger'>
								Для отправки заказа Вам необходимо авторизоваться
							</p>
						)}

						<>
							<table>
								<TableBody {...{ columns, data: selectProds || [] }} />
							</table>
							<TextAreaField
								placeholder='Ваши комментарии: добавочные контакты, вопросы, пожелания и др.'
								onChange={handleComment}
							/>
							<h5 className='mt-4 text-end'>
								Общая сумма {order.costAmount} руб.
							</h5>
							<div className='d-flex  justify-content-end'>
								<div className='d-flex'>
									<button
										className='btn btn-secondary ms-2'
										onClick={handleExit}
									>
										Выйти
									</button>

									<button
										className='btn btn-primary ms-2'
										disabled={!currentUser}
										onClick={handleSubmit}
									>
										{id ? 'Повторить заказ' : 'Отправить заказ'}
									</button>
								</div>
							</div>
						</>
					</div>
				</div>
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	)
}

export default OrderPage
