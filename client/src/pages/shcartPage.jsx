import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShopCart, updateShcart } from '../store/shopCart'
import config from '../config.js'
import _ from 'lodash'
import { getProductsList } from '../store/products'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../store/users'
import TableHeader from '../components/common/table/tableHeader'
import TableBody from '../components/common/table/tableBody'
import { useHistory } from 'react-router-dom'

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const currentUser = useSelector(getCurrentUser())
	const shopCart = useSelector(getShopCart())
	const products = useSelector(getProductsList())
	const [shcart, setShcart] = useState(shopCart)

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
		dispatch(updateShcart(shcart))
	}, [shcart])

	useEffect(() => {
		setSum(selectProds.reduce((acc, p) => acc + p.price, 0))
	}, [shcart])

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
			class: 'col-2 ms-2 ps-2 text-center',
		},
		increment: {
			component: (product) => (
				<div className='column '>
					<button
						className='btn btn-secondary btn-sm ms-1 mb-1'
						onClick={() => handleIncr(product._id)}
					>
						<i className='bi bi-plus-lg'></i>
					</button>
					<button
						className='btn btn-secondary btn-sm ms-1 mb-1'
						onClick={() => handleDecr(product._id)}
					>
						<i className='bi bi-dash-lg'></i>
					</button>
					<button
						className='btn btn-danger btn-sm ms-1 mb-1'
						onClick={() => handleDelete(product._id)}
					>
						<i className='bi bi-x-lg'></i>
					</button>
				</div>
			),
			class: 'col-3 ms-0',
		},
	}

	const handleIncr = (id) => {
		setShcart((prev) => {
			const newShcart = [...prev]
			const product = { ...newShcart.find((p) => p._id === id) }
			product.quantity++
			const index = newShcart.findIndex((p) => p._id === id)
			newShcart[index] = product
			return newShcart
		})
	}

	const handleDecr = (id) => {
		setShcart((prev) => {
			const newShcart = [...prev]
			const product = { ...newShcart.find((p) => p._id === id) }

			if (product.quantity > 1) {
				product.quantity--
				const index = newShcart.findIndex((p) => p._id === id)
				newShcart[index] = product
			}
			return newShcart
		})
	}

	const handleDelete = (id) => {
		setShcart((prev) => prev.filter((c) => c._id !== id))
	}

	const handleAuth = () => {
		history.push('/login')
	}

	const handleCreateOrder = () => {
		history.push('/createorder')
	}

	const handleExit = () => {
		setShcart([])

		history.push('/product/goods')
	}

	return (
		<div className='container mt-5' style={{ maxWidth: '800px' }}>
			<div className='row w-100%'>
				<div className='shadow p-4'>
					<h1>Ваша корзина:</h1>
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
						<>
							<h5>'Пока товары не выбраны'</h5>
							<div className='row justify-content-end'>
								<button
									className='btn btn-secondary col-2'
									onClick={handleExit}
								>
									Выйти
								</button>
							</div>
						</>
					) : (
						<>
							<table>
								<TableHeader {...{ columns }} />
								<TableBody {...{ columns, data: selectProds }} />
							</table>
							<h5 className='mt-4 text-end'>Общая сумма {sum} руб.</h5>
							<div className='d-flex  justify-content-end'>
								<div className='d-flex'>
									{!currentUser ? (
										<button
											className='btn btn-success ms-2'
											onClick={handleAuth}
										>
											Авторизоваться
										</button>
									) : null}
									<button
										className='btn btn-primary ms-2'
										disabled={!currentUser}
										onClick={handleCreateOrder}
									>
										Отправить заказ
									</button>
									<button
										className='btn btn-secondary ms-2'
										onClick={handleExit}
									>
										Выйти
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

export default ShoppingCart
