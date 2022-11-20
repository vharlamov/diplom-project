import React from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../store/categories'

const EducationPage = () => {
	const categories = useSelector(getCategories())

	return (
		<div className='container text-center w-100%'>
			<div className='row w-100% m-0 position-absolute top-50 start-50 translate-middle'>
				<div className='col align-self-center'>
					<h1>
						Обучения пока нет, <br />
						но скоро будет! :)
					</h1>
				</div>
			</div>
		</div>
	)
}

export default EducationPage
