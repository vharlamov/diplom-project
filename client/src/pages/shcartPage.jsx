import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShopCart, removeShcart } from '../store/shopCart'
import config from '../config.json'
import _ from 'lodash'
import { getProductsList } from '../store/products'
import { Link } from 'react-router-dom'

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shopCart = useSelector(getShopCart())
	const products = useSelector(getProductsList())
	const selectProds = products.filter((p) => shopCart.includes(p._id))
	const [shcart, setShcart] = useState([])
	const [data, setData] = useState(selectProds)

	useEffect(() => {
		setData(selectProds)
		setShcart((prev) => [...prev, shopCart])
		console.log('shop cart', shcart)
	}, [shopCart])

	const renderContent = (item, column) => {
		if (columns[column].component) {
			const component = columns[column].component
			if (typeof component === 'function') {
				return component(item)
			}

			return component
		}

		return _.get(item, columns[column].path)
	}

	const handleDelete = (id) => {
		console.log(id)
		dispatch(removeShcart(id))
		console.log('shopcart in ShoppingCart', shopCart)
	}

	const columns = {
		image: {
			path: 'image',
			name: '',
			component: (product) => (
				<img
					src={config.apiEndpoint + 'uploads/' + product.images[0]}
					className='img-thumbnail col-12'
					// style={{ height: 50 }}
				/>
			),
		},
		title: {
			path: 'title',
			name: 'Название',
			component: (product) => (
				<Link to={`/admin/edit/${product._id}`}>{product.title}</Link>
			),
		},
		price: {
			path: 'price',
			name: 'Цена',
		},
		delete: {
			component: (product) => (
				<button
					className='btn btn-danger'
					onClick={() => handleDelete(product._id)}
				>
					Удалить
				</button>
			),
		},
	}

	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-md-8 offset-md-2 shadow p-4'>
					<h1>Ваша корзина:</h1>
					{!shopCart.length ? (
						'Пока товары не выбраны'
					) : (
						<table>
							<tbody>
								{data.map((item) => (
									<tr key={item._id}>
										{Object.keys(columns).map((column) => (
											<td key={column} className='col-2'>
												{renderContent(item, column)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	)
}

export default ShoppingCart
