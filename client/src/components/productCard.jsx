import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import config from '../config.js'
import { updateShcart } from '../store/shopCart'

const ProductCard = ({ data, handleShCart }) => {
	const URL = config + 'uploads/'
	const dispatch = useDispatch()
	const history = useHistory()

	const handleToShcart = () => {
		dispatch(updateShcart(data._id))
	}

	const handleToProdPage = () => {
		history.push(`/product/goods/${data._id}`)
	}

	return (
		<div className='card-group col-lg-4 col-sm-6 col-xs-6 col shadow-sm'>
			<div className='card mb-3 container'>
				<img src={URL + data.images[0]} alt='Фото' className='card-img-top' />
				<div className='card-body'>
					<h5 className='card-title'>{data.title}</h5>
					<div className='row justify-content-between'>
						<p className='col'>{`${data.price} руб`}</p>
						{data.discount && (
							<p className='col text-danger'>
								<strong>{`–${data.discount}%`}</strong>
							</p>
						)}
					</div>
					<p>{data.status ? 'Есть в наличии' : 'На заказ'}</p>
				</div>
				<div className='card-footer row'>
					<button
						className='btn btn-sm btn-primary mb-2'
						onClick={handleToProdPage}
					>
						Подробнее
					</button>
					<button
						className='btn btn-success'
						onClick={() => handleShCart(data._id, 1)}
					>
						В корзину
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
