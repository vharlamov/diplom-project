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
		<div className='container'>
			<div className='row'>
				<input
					type='text'
					onChange={handleSearch}
					className='form-control'
					placeholder='Искать по названию'
				/>
			</div>
			<div className='container d-flex row  w-100 px-2'>
				<div className='d-flex row col-12 gx-2'>
					{filterBySearch().map((p, i) => (
						<ProductCard
							data={p}
							key={i}
							className='card mb-3 shadow-sm'
							handleShCart={handleShCart}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default UserProductWall
