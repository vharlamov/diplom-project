import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCategories } from '../store/categories'

const MainPage = () => {
	const history = useHistory()
	const categories = useSelector(getCategories())

	const goProducts = () => {
		history.push('/product/goods')
	}

	const goEducation = () => {
		history.push('/education')
	}

	return (
		<div className='container text-center'>
			<div className='row justify-content-center'>
				<h1 className='mb-4'>
					Вы в царстве уникальных художественных изделий ручной работы!
				</h1>
				<div className='card mb-3' onClick={goProducts}>
					<h2>Керамика</h2>
					<div className='row justify-content-center col pb-4 '>
						<img
							src={require('../assets/Ceramics_01.jpg')}
							alt=''
							className='col-md-8'
						/>
					</div>
				</div>
				<div className='card mb-3' onClick={goProducts}>
					<h2>Эпоксидные материалы</h2>
					<div className='row justify-content-center col pb-4'>
						<img
							src={require('../assets/Epokside_01.jpg')}
							alt=''
							className='col-md-8'
						/>
					</div>
				</div>
				<div className='card mb-3' onClick={goEducation}>
					<h2>Обучение</h2>
					<div className='row justify-content-center col pb-4'>
						<img
							src={require('../assets/Education_01.jpg')}
							alt=''
							className='col-md-8'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainPage
