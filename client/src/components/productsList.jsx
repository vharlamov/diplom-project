import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getProductsList } from '../store/products'
import ProductTable from './productTable'

const ProductsList = () => {
	const data = useSelector(getProductsList())
	const history = useHistory()
	const [products, setProducts] = useState(data)
	const [search, setSearch] = useState('')
	const [filtered, setFiltered] = useState([])
	const params = useParams()

	useEffect(() => {
		setProducts(data)
		filterBySearch()
	}, [data])

	useEffect(() => {
		filterBySearch()
	}, [search])

	const handleAdd = () => {
		history.push('/admin/add')
	}

	const handleSearch = ({ target }) => {
		setSearch(target.value)
	}

	const filterBySearch = () => {
		const filtrd = search
			? products.filter((p) => {
					return p.title.toLowerCase().indexOf(search.toLowerCase(), 0) !== -1
			  })
			: products
		setFiltered(filtrd)
	}

	return (
		<div className='container pe-0 ps-lg-2 ps-md-2 ps-sm-0 ps-xs-0 me-0 ms-0 col-lg-9 col-md-9 col-sm-12 col-xs-12'>
			<div className='row ms-0 me-2 mb-3'>
				<input
					type='text'
					onChange={handleSearch}
					className='form-control'
					placeholder='Искать по названию'
				/>
			</div>

			<ProductTable products={filtered} />
			<button className='btn btn-primary ' onClick={handleAdd}>
				Добавить товар
			</button>
		</div>
	)
}

export default ProductsList
