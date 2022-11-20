import React, { useEffect, useState } from 'react'
import TextField from '../components/common/form/textField'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SelectField from './common/form/selectField'
import {
	createCategory,
	getCategories,
	removeCategory,
	updateCategory,
} from '../store/categories'
import {
	createChapter,
	getChapters,
	removeChapter,
	updateChapter,
} from '../store/chapters'
import { getProductsList } from '../store/products'

const CategoryForm = () => {
	const testState = {
		target: {
			title: '',
			id: '',
		},
	}
	const chapters = useSelector(getChapters())
	const categories = useSelector(getCategories())
	const products = useSelector(getProductsList())
	const initialData = {
		categoryAdd: '',
		categoryDelete: '',
		categoryChange: {
			name: '',
			id: '',
		},
		chapterAdd: '',
		chapterDelete: '',
		chapterChange: {
			name: '',
			id: '',
		},
	}
	const [data, setData] = useState(initialData)
	const names = new Set()
	categories.forEach((c) => names.add(c.name))
	chapters.forEach((c) => names.add(c.name))
	const history = useHistory()
	const dispatch = useDispatch()
	const [errors, setErrors] = useState({})

	const search = {
		categoryChange: categories.find((c) => c._id === data.categoryChange.id),
		chapterChange: chapters.find((c) => c._id === data.chapterChange.id),
	}

	useEffect(() => {
		if (data.categoryChange.id) {
			setData((prev) => {
				prev.categoryChange.name = search.categoryChange.name
				return { ...prev }
			})
		} else {
			setData((prev) => {
				prev.categoryChange.name = ''
				return { ...prev }
			})
		}
	}, [data.categoryChange.id])

	useEffect(() => {
		if (data.chapterChange.id) {
			setData((prev) => {
				prev.chapterChange.name = search.chapterChange.name
				return { ...prev }
			})
		} else {
			setData((prev) => {
				prev.chapterChange.name = ''
				return { ...prev }
			})
		}
	}, [data.chapterChange.id])

	const validate = (name, value) => {
		setErrors((prev) => {
			delete prev[[name]]
			return { ...prev }
		})

		const findedByCat = products
			.filter((p) => p.category === value)
			.map((p) => p.title)
		const catsError = findedByCat.length
			? `В категории есть товары ${findedByCat.join(', ')}`
			: ''
		const findedByChapt = products
			.filter((p) => p.category === value)
			.map((p) => p.title)
		const chaptsError = findedByChapt
			? `В разделе есть товары ${findedByChapt.join(', ')}`
			: ''
		const essences = {
			categoryDelete: catsError,
			chapterDelete: chaptsError,
		}

		if (
			['categoryAdd', 'chapterAdd', 'categoryChange', 'chapterChange'].includes(
				name
			)
		) {
			if (names.has(value)) {
				const error = 'Название уже существует'
				setErrors((prev) => ({ ...prev, [name]: error }))
			}
		}

		if (['categoryDelete', 'chapterDelete'].includes(name)) {
			if (value && findedByCat.length) {
				setErrors((prev) => ({ ...prev, [name]: essences[[name]] }))
			} else {
				setErrors((prev) => {
					delete prev[[name]]
					return { ...prev }
				})
			}
		}
	}

	const handleChange = (e) => {
		const { name, value, type } = e

		validate(name, value)

		if (
			['categoryAdd', 'categoryDelete', 'chapterAdd', 'chapterDelete'].includes(
				name
			)
		) {
			setData((prev) => ({
				...prev,
				[name]: value,
			}))
		}

		if (['categoryChange', 'chapterChange'].includes(name)) {
			if (type === 'select') {
				setData((prev) => {
					prev[[name]].id = value
					return { ...prev }
				})
			}

			if (type === 'change') {
				setData((prev) => {
					prev[[name]].name = value
					return { ...prev }
				})
			}
		}
	}

	const handleSubmit = () => {
		if (data.categoryAdd) {
			dispatch(createCategory({ name: data.categoryAdd }))
		}
		if (data.categoryDelete) {
			dispatch(removeCategory(data.categoryDelete))
		}
		if (data.categoryChange.id && data.categoryChange.name) {
			dispatch(
				updateCategory(data.categoryChange.id, {
					name: data.categoryChange.name,
				})
			)
		}
		if (data.chapterAdd) {
			dispatch(createChapter({ name: data.chapterAdd }))
		}
		if (data.chapterDelete) {
			dispatch(removeChapter(data.chapterDelete))
		}
		if (data.chapterChange.id && data.chapterChange.name) {
			dispatch(
				updateChapter(data.chapterChange.id, { name: data.chapterChange.name })
			)
		}

		setData(initialData)
	}

	const handleExit = () => {
		history.push('/admin')
	}

	const isValid = Object.keys(errors).length === 0

	return (
		<div className='container-sm max-width-300'>
			<form>
				<SelectField
					label='Удалить раздел'
					name='chapterDelete'
					acttype='delete'
					options={chapters.map((c) => ({
						name: c.name,
						value: c._id,
					}))}
					defaultOption='Все'
					value={data.chapterDelete}
					onChange={handleChange}
					error={errors.chapterDelete}
				/>
				<TextField
					label='Добавить раздел'
					name='chapterAdd'
					value={data.chapterAdd}
					onChange={handleChange}
					error={errors.chapterAdd}
				/>
				<fieldset>
					<SelectField
						label='Изменить раздел'
						name='chapterChange'
						acttype='select'
						options={chapters.map((c) => ({
							name: c.name,
							value: c._id,
						}))}
						value={data.chapterChange.id}
						defaultOption='Все'
						onChange={handleChange}
					/>
					{data.chapterChange.name && (
						<TextField
							placeholder='Новое название'
							acttype='change'
							name='chapterChange'
							onChange={handleChange}
							value={data.chapterChange.name}
							error={errors.chapterChange}
						/>
					)}
				</fieldset>
				<hr className='bg-success mt-20' style={{ height: '4px' }} />
				<SelectField
					label='Удалить категорию'
					name='categoryDelete'
					acttype='delete'
					options={categories.map((c) => ({
						name: c.name,
						value: c._id,
					}))}
					defaultOption='Все'
					onChange={handleChange}
					value={data.categoryDelete}
					error={errors.categoryDelete}
				/>
				<TextField
					label='Добавить категорию'
					acttype='add'
					name='categoryAdd'
					onChange={handleChange}
					value={data.categoryAdd}
					error={errors.categoryAdd}
				/>
				<fieldset className='mb-2'>
					<SelectField
						label='Изменить категорию'
						name='categoryChange'
						acttype='select'
						options={categories.map((c) => ({
							name: c.name,
							value: c._id,
						}))}
						value={data.categoryChange.id}
						defaultOption='Все'
						onChange={handleChange}
					/>
					{data.categoryChange.name && (
						<TextField
							placeholder='Новое название'
							acttype='change'
							name='categoryChange'
							onChange={handleChange}
							value={data.categoryChange.name}
							error={errors.categoryChange}
						/>
					)}
				</fieldset>
				<hr className='bg-success mt-20 mb-4' style={{ height: '4px' }} />
				<button
					type='button'
					disabled={!isValid}
					className='btn btn-danger w-100 mx-auto mb-3'
					onClick={handleSubmit}
				>
					Отправить
				</button>
			</form>
			<button
				type='button'
				className='btn btn-success w-100 mx-auto'
				onClick={handleExit}
			>
				Выйти
			</button>
		</div>
	)
}

export default CategoryForm
