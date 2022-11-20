import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from './productCard'

const UserProductWall = ({ products, handleShCart }) => {
	const params = useParams()
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')

	const handleSearch = ({ target }) => {
		setSearch(target.value)
	}

	const filterBySearch = () => {
		const filtered = search
			? products.filter(
					(p) => p.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
			  )
			: products
		return filtered
	}

	return (
		<div className='container px-0 me-0 ms-0 col-lg-9 col-md-9 col-sm-12 col-xs-12'>
			<div className='d-flex flex-row mx-3 justify-content-end'>
				<input
					type='text'
					onChange={handleSearch}
					className='form-control mb-2'
					placeholder='Искать по названию'
				/>
			</div>
			<div className='row row-cols-1 row-cols-xs-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 justify-content-center mx-0 w-100%'>
				{filterBySearch().map((p, i) => (
					<ProductCard data={p} key={i} handleShCart={handleShCart} />
				))}
			</div>
		</div>
	)
}

export default UserProductWall
