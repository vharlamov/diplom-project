import React from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../store/categories'

const CeramicsPage = () => {
	const categories = useSelector(getCategories())

	return (
		<>
			<h1>CeramicsPage</h1>
			<p>{JSON.stringify(categories)}</p>
		</>
	)
}

export default CeramicsPage
