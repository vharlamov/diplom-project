import React from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../store/categories'

const EducationPage = () => {
	const categories = useSelector(getCategories())

	return (
		<>
			<h1>EducationPage</h1>
			<p>{JSON.stringify(categories)}</p>
		</>
	)
}

export default EducationPage
