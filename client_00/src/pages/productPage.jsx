import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../store/products'
import config from '../config.json'
import { useHistory } from 'react-router-dom'
import { getShopCart, loadShcart, updateShcart } from '../store/shopCart'

const ProductPage = ({ id }) => {
	const dispatch = useDispatch()
	const product = useSelector(getProductById(id))
	const URL = config.apiEndpoint + 'uploads/'
	const history = useHistory()
	const shopCart = useSelector(getShopCart())
	const [shcart, setShcart] = useState(shopCart)

	const handleExit = () => {
		history.goBack()
	}

	const handleShcart = (_id) => {
		const index = shcart.findIndex((shc) => shc._id === _id)
		if (index === -1) {
			setShcart((prev) => [...prev, { _id, quantity: 1 }])
		} else {
			setShcart((prev) => {
				const prod = { ...prev[index] }
				prod.quantity++
				const newShcart = [...prev]
				newShcart[index] = prod
				return newShcart
			})
		}
	}

	useEffect(() => {
		dispatch(updateShcart(shcart))
	}, [shcart])

	return (
		<div className='w-100'>
			<div className='row'>
				{product.images.map((img, i) => (
					<img src={URL + img} key={i} className='img col-4' />
				))}
			</div>
			<hr />
			<div>
				<h2>{product.title}</h2>
				<p>{product.description}</p>
				<p>
					<strong>{`Цена ${product.price} руб`}</strong>
				</p>
				<p>{product.status ? 'Есть в наличии' : 'На заказ'}</p>
			</div>
			<div>
				<button className='btn btn-primary' onClick={handleExit}>
					Закрыть
				</button>
				<button
					className='btn btn-success ms-3'
					onClick={() => handleShcart(id)}
				>
					В корзину
				</button>
			</div>
		</div>
	)
}

export default ProductPage
