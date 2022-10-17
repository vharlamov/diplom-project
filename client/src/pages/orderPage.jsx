import { getShopCart } from '../store/shopCart'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, updateUser } from '../store/users'
import TableBody from '../components/common/table/tableBody'
import { getProductsList } from '../store/products'
import { useEffect, useState } from 'react'
import config from '../config.js'
import TextAreaField from '../components/common/form/textAreaField'
import {
	createOrder,
	getCurrentOrder,
	getOrdersList,
	loadOrdersList,
} from '../store/orders'
import history from '../utils/history'

const orderPage = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUser())
	const shopCart = useSelector(getShopCart())
	const products = useSelector(getProductsList())
	const currentOrders = useSelector(getOrdersList())
	const currentOrder = useSelector(getCurrentOrder())
	const [shcart, setShcart] = useState(shopCart)

	console.log('current user', currentUser)
	const initOrder = {
		userId: currentUser._id,
		status: 0,
		products: shopCart,
		comment: '',
	}
	const [order, setOrder] = useState(initOrder)
	const selectProds = shcart.map((item) => {
		const product = products.find((p) => p._id === item._id)
		return {
			...product,
			quantity: item.quantity,
			price: product.price * item.quantity,
		}
	})
	const [sum, setSum] = useState(
		selectProds.reduce((acc, p) => acc + p.price, 0)
	)

	useEffect(() => {
		// console.log('current Orders', currentOrders)
		// const currentOrder = currentOrders[currentOrders.length - 1]
		// console.log('currentOrder', currentOrder._id)

		if (currentOrder) {
			const orders = currentUser.orders || []
			let updOrders = [...orders]
			updOrders.unshift(currentOrder._id)
			console.log('orders', [...currentUser.orders])
			const updatedUser = { ...currentUser, orders: updOrders }
			dispatch(updateUser(updatedUser))
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
		price: {
			path: 'price',
			name: 'Цена',
			class: 'col-1 ms-0 text-center',
		},
		quantity: {
			path: 'quantity',
			name: 'Кол-во',
			class: 'col-2 ms-2 ps-2 text-center',
		},
	}

	const handleComment = ({ value }) => {
		setOrder((prev) => ({ ...prev, comment: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log('send order payload', order)
		dispatch(createOrder(order))
	}

	const handleExit = () => {
		history.push('/product/goods')
	}

	return (
		<div className='container mt-5' style={{ maxWidth: '800px' }}>
			<div className='row w-100%'>
				<div className='shadow p-4'>
					<h1>Ваш заказ:</h1>
					<h5>Пользователь: </h5>
					{currentUser ? (
						<div>
							<p className='mb-0 width-4'>Имя: {currentUser.name}</p>
							<p>Email: {currentUser.email}</p>
						</div>
					) : (
						<p className='text-danger'>
							Для отправки заказа Вам необходимо авторизоваться
						</p>
					)}

					{!shcart.length ? (
						'Пока товары не выбраны'
					) : (
						<>
							<table>
								<TableBody {...{ columns, data: selectProds }} />
							</table>
							<TextAreaField
								placeholder='Ваши комментарии: добавочные контакты, вопросы, пожелания и др.'
								onChange={handleComment}
							/>
							<h5 className='mt-4 text-end'>Общая сумма {sum} руб.</h5>
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
										Отправить заказ
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default orderPage
