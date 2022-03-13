import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from './productCard'

const UserProductWall = ({ chapter, products, onChange }) => {
	// console.log('UserProductWall', products)
	const params = useParams()
	const sortedProds = products.filter((p) => p.chapter === chapter)
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		setData(sortedProds)
	}, [products])

	const handleSearch = ({ target }) => {
		setSearch(target.value)
	}

	const filterBySearch = () => {
		const filtered = search
			? data.filter(
					(p) => p.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
			  )
			: data
		return filtered
	}

	return (
		<div className='container'>
			<div className='row ms-0 me-2 mb-3'>
				<input
					type='text'
					onChange={handleSearch}
					className='form-control'
					placeholder='Искать по названию'
				/>
			</div>
			<div className='row  w-100'>
				{filterBySearch().map((p, i) => (
					<ProductCard data={p} key={i} />
				))}
			</div>
		</div>
	)
}

export default UserProductWall
