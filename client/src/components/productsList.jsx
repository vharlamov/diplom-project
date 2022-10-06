import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ProductTable from './productTable'

const ProductsList = ({ product }) => {
	const history = useHistory()
	const [products, setProducts] = useState(product)
	const [search, setSearch] = useState('')
	const [filtered, setFiltered] = useState([])
	const params = useParams()

	useEffect(() => {
		setProducts(product)
		filterBySearch()
	})

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
		<div className='container max-width-sm w-75 h-100'>
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
