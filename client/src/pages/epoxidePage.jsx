import React from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../store/categories'

const EpoxidePage = () => {
	const categories = useSelector(getCategories())

	return (
		<>
			<h1>EpoxidePage</h1>
			<p>{JSON.stringify(categories)}</p>
		</>
	)
}

export default EpoxidePage
