import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import config from '../config.js'
import Table from './common/table/table'

const ProductTable = ({ products }) => {
	useEffect(() => {}, [products])
	const columns = {
		image: {
			path: 'image',
			name: '',
			component: (product) => (
				<img
					src={config + 'uploads/' + product.images[0]}
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
		discount: {
			path: 'discount',
			name: 'Скидка',
		},
		quantity: {
			path: 'quantity',
			name: 'Количество',
		},
		status: {
			path: 'status',
			name: 'Наличие',
			component: (product) => (product.status ? 'Есть' : 'На заказ'),
		},
		sales: {
			path: 'sales',
			name: 'Продано',
		},
	}

	return <Table data={products} columns={columns} />
}

export default ProductTable
