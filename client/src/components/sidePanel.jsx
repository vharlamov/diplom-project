import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import imageService from '../services/imageService'
import { getCategories } from '../store/categories'
import { getProductsList } from '../store/products'
import { getSubcategories } from '../store/subcategories'
import sortProducts from '../utils/sortProducts'
import CheckBoxField from './common/form/checkBoxField'
import RadioField from './common/form/radio.Field'
import SelectField from './common/form/selectField'
import SliderField from './common/form/sliderField'

const SidePanel = ({ onSort, isAdmin }) => {
	const categories = useSelector(getCategories())
	const subcategories = useSelector(getSubcategories())
	const products = useSelector(getProductsList())
	const history = useHistory()
	const initialSortData = {
		priceCrop: getPricesMinMax().max,
		priceOrder: 'none',
		inStock: false,
		discount: false,
		chapter: 'all',
		category: 'all',
		subcategory: [],
	}
	const [sortData, setSortData] = useState({ ...initialSortData })

	const [formConfig, setFormConfig] = useState({
		priceCrop: getPricesMinMax(),
		priceOrder: 'none',
		inStock: false,
		discount: false,
		chapter: [
			{ name: 'Все', value: 'all' },
			{ name: 'Керамика', value: 'ceramics' },
			{ name: 'Эпоксидка', value: 'epoxide' },
		],
		category: 'all',
		subcategories: [],
	})

	useEffect(() => {
		setSortData((prev) => ({
			...prev,
			subcategories: getSubcategoriesOpts(),
		}))
	}, [sortData.category])

	function getCategoryOpts() {
		const cats = categories.map((c) => ({
			name: c.name,
			value: c._id,
			chapter: c.chapter,
		}))
		const cropedCats =
			sortData.chapter !== 'all'
				? cats.filter((c) => c.chapter === sortData.chapter)
				: cats
		// console.log('cropedCats', cropedCats)
		return cropedCats
	}

	function getSubcategoriesOpts() {
		const subcats = subcategories.map((s) => ({
			name: s.name,
			value: s._id,
		}))
		const category = categories.find((cat) => cat._id === sortData.category)

		if (category) {
			return category.subcategories.map((sid) =>
				subcats.find((cat) => cat.value === sid)
			)
		}

		return []
	}

	function getPricesMinMax() {
		const prices = products.map((p) => p.price).sort((a, b) => a - b)
		return { min: prices[0], max: prices[prices.length - 1] }
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
		// console.log('excess', excess)

		excess.forEach(async (e) => {
			await imageService.removeImage(e)
		})
	}

	const onChange = (target) => {
		setSortData((prev) => ({ ...prev, [target.name]: target.value }))
		// console.log('sortData', sortData)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const sortedList = sortProducts(products, sortData, getPricesMinMax().max)
		onSort(sortedList)
		// console.log('sortedList', sortedList)
	}

	const handleReset = () => {
		setSortData({ ...initialSortData })
		onSort(products)
	}

	const editCategory = () => {
		history.push('/changecategory')
	}

	return (
		<div className='container shadow col-3 max-width-600px mt-5vh bg-light'>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<SliderField
						value={sortData.priceCrop}
						options={sortData.priceCrop}
						minmax={formConfig.priceCrop}
						defaultValue={formConfig.priceCrop.max}
						onChange={onChange}
						name='priceCrop'
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
					{isAdmin && (
						<SelectField
							options={[
								{ name: 'Все', value: 'all' },
								{ name: 'Керамика', value: 'ceramics' },
								{ name: 'Эпоксидка', value: 'epoxide' },
							]}
							onChange={onChange}
							name='chapter'
							defaultOption='Все'
							label='Раздел'
						/>
					)}
					<SelectField
						options={getCategoryOpts()}
						onChange={onChange}
						name='category'
						defaultOption='Все'
						label='Категория'
					/>
					<SelectField
						options={sortData.subcategories}
						onChange={onChange}
						name='subcategory'
						defaultOption='Все'
						label='Подкатегория'
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
