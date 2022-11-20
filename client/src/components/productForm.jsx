import React, { useState, useEffect } from 'react'
import ImgsLoadField from './common/form/imgsLoadField'
import SelectField from './common/form/selectField'
import TextAreaField from './common/form/textAreaField'
import TextField from './common/form/textField'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../store/categories'
import {
	createProduct,
	getProductById,
	removeProduct,
	updateProduct,
} from '../store/products'
import { useHistory, useParams } from 'react-router-dom'
import imageService from '../services/imageService'
import { getChapters } from '../store/chapters'
import ImageCard from './imageCard'

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
	const currentProduct = useSelector(getProductById(params.edit))

	useEffect(() => {
		if (currentProduct) {
			setData(currentProduct)
		}
	}, [])

	const getChaptersOpts = () => {
		const chapts = chapters.map((ch) => {
			const { name, _id } = ch
			return { name, value: _id }
		})
		return chapts
	}

	const categories = useSelector(getCategories()) || []

	function getCategoryOpts() {
		const cats = categories.map((c) => {
			const { name, _id } = c
			return { name, value: c._id }
		})
		return cats
	}

	useEffect(() => {
		setData((prev) => ({ ...prev, status: data.quantity ? 1 : 0 }))
	}, [data.quantity])

	const handleChangeImgs = (img, action) => {
		const imgs = [...images]

		if (action === 'add') {
			imgs.push(img)
			setImages(imgs)
		} else if (action === 'delete') {
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
	}

	const handleChange = (target) => {
		let value = target.value
		const numberFields = ['price', 'quantity', 'discount', 'sales', 'rate']

		if (numberFields.includes(target.name)) {
			value = +value
		} else if (target.name === 'category') {
			setData((prev) => ({ ...prev, category: '' }))
		}

		setData((prev) => ({ ...prev, [target.name]: value }))
	}

	const handleSubmit = () => {
		const newData = { ...data }

		newData.images = data.images.concat(images)
		const id = newData._id
		delete newData._id

		if (currentProduct) {
			dispatch(updateProduct(id, newData))
		} else {
			dispatch(createProduct(newData))
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
		<div className='container col-lg-9 col-md-9 mx-0 px-4'>
			<div className='row mx-0 px-0 w-100%'>
				<form className='row w-100% px-0' onSubmit={handleSubmit}>
					<div className='row cols-2 px-0'>
						<div className='col-4 mx-0'>
							<TextField
								label='Название'
								name='title'
								value={data.title}
								onChange={handleChange}
								error={errors.title}
							/>
						</div>
						<div className='col-8 mx-0 px-0'>
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
					<div className='row cols-5'>
						<div className='col'>
							<TextField
								label='Цена'
								type='number'
								name='price'
								value={data.price || ''}
								onChange={handleChange}
								error={errors.price}
							/>
						</div>
						<div className='col'>
							<TextField
								label='Скидка'
								type='number'
								name='discount'
								value={data.discount || ''}
								onChange={handleChange}
								error={errors.discount}
							/>
						</div>
						<div className='col'>
							<TextField
								label='Продано'
								name='sales'
								type='number'
								value={data.sales || ''}
								onChange={handleChange}
								error={errors.sales}
							/>
						</div>
						<div className='col'>
							<TextField
								label='В наличии'
								type='number'
								name='quantity'
								value={data.quantity || ''}
								onChange={handleChange}
								error={errors.quantity}
							/>
						</div>
						<div className='col'>
							<TextField
								label='Рейтинг'
								type='number'
								name='rate'
								value={data.rate || ''}
								onChange={handleChange}
								error={errors.rate}
							/>
						</div>
					</div>
					<hr className='bg-danger border-2 border-danger' />
					<div className='row cols-2'>
						<div className='col'>
							<SelectField
								defaultOption={{ name: 'Все', value: 'all' }}
								label='Раздел'
								name='chapter'
								options={getChaptersOpts()}
								value={data.chapter}
								onChange={handleChange}
								error={errors.chapter}
							/>
						</div>
						<div className='col'>
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
					</div>
				</form>
				<hr className='bg-danger border-2 border-danger' />
				<div className='container d-flex px-0 w-100%'>
					<div className='row w-100% cols-lg-3 cols-md-3 cols-sm-2 cols-xs-1'>
						{data.images.length
							? data.images.map((file, i) => (
									<ImageCard
										file={file}
										onClick={handleDeleteProdImage}
										key={i}
									/>
							  ))
							: null}
					</div>
				</div>

				<ImgsLoadField
					label='Выберите изображение для загрузки:'
					name='images'
					value={images}
					onChange={handleChangeImgs}
					error={errors.images}
				/>
				<hr className='bg-danger border-2 border-danger' />
				<div className='row w-100% p-0 gap-3 justify-content-end mb-5'>
					<button
						className='btn btn-danger col'
						disabled={!data._id}
						type='button'
						onClick={handleDeleteProduct}
					>
						Удалить товар
					</button>
					<button
						className='btn btn-primary col'
						type='button'
						onClick={handleCancel}
					>
						Отмена
					</button>
					<button
						className='btn btn-success col'
						type='button'
						onClick={handleSubmit}
					>
						Сохранить товар
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductForm
