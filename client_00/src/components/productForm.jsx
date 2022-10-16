import React, { useState, useEffect } from 'react'
import ImgsLoadField from './common/form/imgsLoadField'
import SelectField from './common/form/selectField'
import TextAreaField from './common/form/textAreaField'
import TextField from './common/form/textField'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../store/categories'
import { getSubcategories } from '../store/subcategories'
import {
	createProduct,
	getProductById,
	removeProduct,
	updateProduct,
} from '../store/products'
import { useHistory, useParams } from 'react-router-dom'
import imageService from '../services/imageService'
import config from '../config.json'
import { getChapters } from '../store/chapters'

const initialData = {
	_id: '',
	title: '',
	description: '',
	quantity: 0,
	status: 0,
	price: 0,
	discount: 0,
	sales: 0,
	chapter: '',
	category: '',
	images: [],
	rate: 0,
}

const ProductForm = () => {
	const history = useHistory()
	const params = useParams()
	const chapters = useSelector(getChapters())
	const dispatch = useDispatch()
	const [errors, setError] = useState({})
	const [data, setData] = useState(initialData)
	const [images, setImages] = useState([])
	const URL = config.apiEndpoint + 'uploads/'

	const [formConfig, setFormConfig] = useState({
		chapter: [
			{ name: 'Все', value: 'all' },
			{ name: 'Керамика', value: 'ceramics' },
			{ name: 'Эпоксидка', value: 'epoxide' },
		],
		category: 'all',
		subcategories: [],
	})

	const currentProduct = useSelector(getProductById(params.edit))
	// console.log('currentProduct', currentProduct)

	useEffect(() => {
		if (currentProduct) {
			setData(currentProduct)
		}
		console.log('product form current', currentProduct)
	}, [])

	// const chapters = ['ceramics', 'epoxide', 'education']
	const getChaptersOpts = () => {
		const chapts = chapters.map((ch) => {
			const { name, _id } = ch
			return { name, value: _id }
		})
		return chapts
	}

	const categories = useSelector(getCategories()) || []

	function getCategoryOpts() {
		console.log('getCategoryOpts', categories)
		const cats = categories.map((c) => {
			const { name, _id } = c
			return { name, value: c._id }
		})
		// const cropedCats = cats.filter((c) => c.chapter === data.chapter)
		// console.log('cropedCats', cropedCats)
		return cats
	}

	// const catsList = cats.map((c) => ({
	// 	label: c.name,
	// 	value: c._id,
	// }))

	// useEffect(() => {
	// 	if (data.category !== 'all') {
	// 		setFormConfig((prev) => ({
	// 			...prev,
	// 			subcategories: getSubcategoriesOpts(),
	// 		}))
	// 	}
	// }, [data.category])

	useEffect(() => {
		setData((prev) => ({ ...prev, status: data.quantity ? 1 : 0 }))
	}, [data.quantity])

	const handleChangeImgs = (img, action) => {
		const imgs = [...images]

		if (action === 'add') {
			imgs.push(img)
			setImages(imgs)
		} else if (action === 'delete') {
			// const { content } = await imageService.getImage()
			setImages((prev) => ({
				...prev,
				images: imgs.filter((image) => image !== img),
			}))
		}
	}

	const handleDeleteProdImage = ({ target }) => {
		const img = target.dataset.filename
		const imgs = [...data.images].filter((image) => image !== img)

		setData((prev) => ({ ...prev, images: imgs }))
		imageService.removeImage(img)
		console.log('delete image', images)
	}

	const handleChange = (target) => {
		let value = target.value
		const numberFields = ['price', 'quantity', 'discount', 'sales', 'rate']

		if (numberFields.includes(target.name)) {
			value = +value
		} else if (target.name === 'category') {
			console.log('form target', target)
			setData((prev) => ({ ...prev, category: '' }))
		}

		setData((prev) => ({ ...prev, [target.name]: value }))
	}

	const handleSubmit = () => {
		const newData = { ...data }

		newData.images = data.images.concat(images)
		// console.log('images', newData.images)
		const id = newData._id
		delete newData._id

		if (currentProduct) {
			dispatch(updateProduct(id, newData))
			console.log('handleSubmit update')
		} else {
			dispatch(createProduct(newData))
			console.log('handleSubmit create')
		}

		history.push('/admin')
	}

	const handleDeleteProduct = async () => {
		const confirm = confirm('Вы точно хотите удалить товар? Это необратимо.')
		if (!confirm) return
		const { content } = await imageService.getImage()

		data.images.forEach(async (img) => {
			if (content.includes(img)) {
				await imageService.removeImage(img)
			}
		})
		images.forEach(async (img) => {
			if (content.includes(img)) {
				await imageService.removeImage(img)
			}
		})
		dispatch(removeProduct(data._id))

		history.push('/admin')
	}

	const handleCancel = async () => {
		const { content } = await imageService.getImage()

		images.forEach(async (img) => {
			if (content.includes(img)) {
				await imageService.removeImage(img)
			}
		})

		history.push('/admin')
	}

	return (
		<>
			<div className='d-flex flex-column mx-3'>
				<form onSubmit={handleSubmit}>
					<div className='d-flex flex-row'>
						<div className='col-4'>
							<TextField
								label='Название'
								name='title'
								value={data.title}
								onChange={handleChange}
								error={errors.title}
							/>
						</div>
						<div className='col-8'>
							<TextAreaField
								label='Описание'
								name='description'
								value={data.description}
								onChange={handleChange}
								error={errors.description}
							/>
						</div>
					</div>
					<hr
						style={{ size: '2px' }}
						className='bg-danger border-2 border-danger'
					/>
					<div className='d-flex flex-row'>
						<TextField
							label='Цена'
							type='number'
							name='price'
							value={data.price || ''}
							onChange={handleChange}
							error={errors.price}
						/>
						<TextField
							label='Скидка'
							type='number'
							name='discount'
							value={data.discount || ''}
							onChange={handleChange}
							error={errors.discount}
						/>
						<TextField
							label='Продано'
							name='sales'
							type='number'
							value={data.sales || ''}
							onChange={handleChange}
							error={errors.sales}
						/>
						<TextField
							label='В наличии'
							type='number'
							name='quantity'
							value={data.quantity || ''}
							onChange={handleChange}
							error={errors.quantity}
						/>
						<TextField
							label='Рейтинг'
							type='number'
							name='rate'
							value={data.rate || ''}
							onChange={handleChange}
							error={errors.rate}
						/>
					</div>
					<hr className='bg-danger border-2 border-danger' />
					<div className='d-flex flex-row'>
						<SelectField
							defaultOption={{ name: 'Все', value: 'all' }}
							label='Раздел'
							name='chapter'
							options={getChaptersOpts()}
							value={data.chapter}
							onChange={handleChange}
							error={errors.chapter}
						/>
						<SelectField
							defaultOption={{ name: 'Все', value: 'all' }}
							label='Категория'
							name='category'
							options={getCategoryOpts()}
							value={data.category}
							onChange={handleChange}
							error={errors.category}
						/>
					</div>
				</form>
				<hr className='bg-danger border-2 border-danger' />
				<div className='d-flex flex-row'>
					{data.images.length
						? data.images.map((file, i) => (
								<div className='d-flex flex-column mt-3 ms-3' key={i}>
									<img src={URL + file} style={{ height: 260 }} />
									<button
										className='btn btn-danger w-50%'
										data-filename={file}
										onClick={handleDeleteProdImage}
									>
										Удалить
									</button>
								</div>
						  ))
						: null}
				</div>

				<ImgsLoadField
					label='Выберите изображение для загрузки:'
					name='images'
					value={images}
					onChange={handleChangeImgs}
					error={errors.images}
				/>
				<hr className='bg-danger border-2 border-danger' />
				<div className='d-grid gap-3 d-md-flex justify-content-end mb-5'>
					<button
						className='btn btn-danger'
						disabled={!data._id}
						type='button'
						onClick={handleDeleteProduct}
					>
						Удалить товар
					</button>
					<button
						className='btn btn-primary'
						type='button'
						onClick={handleCancel}
					>
						Отмена
					</button>
					<button
						className='btn btn-success'
						type='button'
						onClick={handleSubmit}
					>
						Сохранить товар
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductForm
