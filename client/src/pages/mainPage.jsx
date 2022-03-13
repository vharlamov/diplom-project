import React from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../store/categories'

const MainPage = () => {
	const categories = useSelector(getCategories())

	return (
		<>
			<h1>Здесь вы можете ознакомиться с нашими товарами и услугами:</h1>
			<div className='card'>Керамика</div>
		</>
	)
}

export default MainPage
