import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ProductTable from './productTable'

const ProductsList = ({ product }) => {
	const history = useHistory()
	// const [products, setProducts] = useState(product)
	const [search, setSearch] = useState('')
	// const [filtered, setFiltered] = useState([])

	// useEffect(() => {
	// 	setProducts(product)
	// 	console.log('product list product', product)
	// 	filterBySearch()
	// 	console.log('product list filtered', filtered)
	// }, [product, filtered])

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
			? product.filter((p) => {
					return p.title.toLowerCase().indexOf(search.toLowerCase(), 0) !== -1
			  })
			: product
		return filtrd
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

			<ProductTable products={filterBySearch()} />
			<button className='btn btn-primary ' onClick={handleAdd}>
				Добавить товар
			</button>
		</div>
	)
}

export default ProductsList
