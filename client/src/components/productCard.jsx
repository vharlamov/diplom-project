import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import config from '../config.json'
import { addShcart } from '../store/shopCart'

const ProductCard = ({ data, chapter }) => {
	const URL = config.apiEndpoint + 'uploads/'
	const dispatch = useDispatch()
	const history = useHistory()

	const handleToShcart = () => {
		dispatch(addShcart(data._id))
	}

	const handleToProdPage = () => {
		history.push(`/product/${chapter}/${data._id}`)
	}

	return (
		<div className='card col-3 me-3 mb-3 shadow-sm'>
			<img src={URL + data.images[0]} alt='Фото' className='card-img-top' />
			<div className='card-body'>
				<h5 className='card-title'>{data.title}</h5>
				<p>{`${data.price} руб`}</p>
				{data.discount ? <p>{`Скидка ${data.discount}%`}</p> : null}
				<p>{data.status ? 'Есть в наличии' : 'На заказ'}</p>
			</div>
			<div className='card-footer row'>
				<button className='btn-sm btn-primary mb-2' onClick={handleToProdPage}>
					Подробнее
				</button>
				<button className='btn-sm btn-success' onClick={handleToShcart}>
					В корзину
				</button>
			</div>
		</div>
	)
}

export default ProductCard
