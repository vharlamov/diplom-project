import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import imageService from '../services/imageService'
import { getCategories } from '../store/categories'
import { getChapters } from '../store/chapters'
import { getProductsList } from '../store/products'
import sortProducts from '../utils/sortProducts'
import CheckBoxField from './common/form/checkBoxField'
import RadioField from './common/form/radio.Field'
import SelectField from './common/form/selectField'
import SliderField from './common/form/sliderField'

const SidePanel = ({ onSort, isAdmin, products, price }) => {
	const categories = useSelector(getCategories())
	const chapters = useSelector(getChapters())
	// console.log('side panel chapters', chapters)
	const history = useHistory()
	const initialSortData = {
		price: price.max,
		priceOrder: 'none',
		inStock: false,
		discount: false,
		chapter: 'all',
		category: 'all',
	}
	const [sortData, setSortData] = useState(initialSortData)

	const initialConfig = {
		price: sortData.price,
		priceOrder: sortData.priceOrder,
		inStock: sortData.inStock,
		discount: sortData.discount,
		chapter: sortData.chapter,
		category: sortData.category,
	}

	const [formConfig, setFormConfig] = useState(initialConfig)

	useEffect(() => {
		setFormConfig(sortData)
	}, [sortData])

	// useEffect(() => {
	// 	console.log('Chapters in sidePanel', chapters)
	// }, [])

	function getCategoryOpts() {
		const cats = categories.map((c) => ({
			name: c.name,
			value: c._id,
		}))
		return cats
	}

	function getChapterOpts() {
		const chapts = chapters.map((c) => ({
			name: c.name,
			value: c._id,
		}))
		return chapts
	}

	const prodImages = () => {
		const prodsIds = products.reduce((acc, p) => {
			p.images.forEach((i) => acc.push(i))
			return acc
		}, [])

		return prodsIds
	}

	const clearImages = async () => {
		const necessary = prodImages()
		const { content } = await imageService.getImage()
		const excess = content.filter((item) => !necessary.includes(item))

		excess.forEach(async (e) => {
			await imageService.removeImage(e)
		})
	}

	const onChange = (target) => {
		setSortData((prev) => ({ ...prev, [target.name]: target.value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onSort(sortData)
	}

	const handleReset = () => {
		setSortData(initialSortData)
		setFormConfig(initialConfig)
		onSort(initialSortData)
		console.log('reset config', formConfig)
	}

	const editCategory = () => {
		history.push('/changecategory')
	}

	return (
		<div className='container shadow col-3 max-width-600px mt-5vh bg-light'>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<SliderField
						value={sortData.price}
						// options={formConfig.price}
						minmax={price}
						defaultValue={price.max}
						onChange={onChange}
						name='price'
					/>
					<RadioField
						options={[
							{ label: 'Не сортировать', name: 'priceOrder', value: 'none' },
							{ label: 'По возрастанию', name: 'priceOrder', value: 'asc' },
							{ label: 'По убыванию', name: 'priceOrder', value: 'desc' },
						]}
						value={sortData.priceOrder}
						onChange={onChange}
						name='priceRange'
					/>
					<hr />
					<CheckBoxField
						value={sortData.inStock}
						onChange={onChange}
						name='inStock'
						label='В наличии'
					/>
					<CheckBoxField
						value={sortData.discount}
						onChange={onChange}
						name='discount'
						label='Со скидкой'
					/>
					<hr />
					<SelectField
						options={getChapterOpts()}
						onChange={onChange}
						name='chapter'
						defaultOption={{ name: 'Все', value: 'all' }}
						label='Раздел'
						value={sortData.chapter}
					/>

					<SelectField
						options={getCategoryOpts()}
						onChange={onChange}
						name='category'
						defaultOption={{ name: 'Все', value: 'all' }}
						label='Категория'
						value={sortData.category}
					/>
				</div>
				<div className='row me-2 ms-2'>
					<button className='btn btn-primary mb-2' type='submit'>
						Сортировать
					</button>
					<button
						className='btn btn-warning mb-3'
						type='button'
						onClick={handleReset}
					>
						Сброс настроек
					</button>
					{isAdmin && (
						<>
							<hr />
							<button className='btn btn-success mb-3' onClick={clearImages}>
								Очистить хранилище
							</button>
							<button className='btn btn-danger mb-3' onClick={editCategory}>
								Изменить категории
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	)
}

export default SidePanel
