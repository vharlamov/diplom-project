import React from 'react'
import { useSelector } from 'react-redux'
import { getProductById } from '../store/products'
import config from '../config.json'
import { useHistory } from 'react-router-dom'

const ProductPage = ({ id }) => {
	const product = useSelector(getProductById(id))
	const URL = config.apiEndpoint + 'uploads/'
	const history = useHistory()

	const handleExit = () => {
		history.goBack()
	}

	const handleToOrder = () => {}

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
				<button className='btn btn-success ms-3' onClick={handleToOrder}>
					В корзину
				</button>
			</div>
		</div>
	)
}

export default ProductPage
