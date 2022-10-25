import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from './productCard'

const UserProductWall = ({ products, handleShCart }) => {
	// console.log('UserProductWall', products)
	const params = useParams()
	// const sortedProds = products.filter((p) => p.chapter === chapter)
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')

	// useEffect(() => {
	// 	setData(sortedProds)
	// }, [products])

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
		<div className='container pe-0 ps-lg-2 ps-md-2 me-0 ms-0 col-lg-9 col-md-9 col-sm-12 col-xs-12'>
			<div className='d-flex flex-row justify-content-end'>
				<input
					type='text'
					onChange={handleSearch}
					className='form-control mb-2'
					placeholder='Искать по названию'
				/>
			</div>
			<div className='row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 justify-content-center w-100%'>
				{filterBySearch().map((p, i) => (
					<ProductCard data={p} key={i} handleShCart={handleShCart} />
				))}
			</div>
		</div>
	)
}

export default UserProductWall
