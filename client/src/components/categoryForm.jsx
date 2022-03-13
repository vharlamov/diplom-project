import React, { useEffect, useState } from 'react'
import { validator } from '../utils/ validator'
import TextField from '../components/common/form/textField'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SelectField from './common/form/selectField'
import { createCategory, getCategories } from '../store/categories'
import { createSubcat } from '../store/subcategories'

const CategoryForm = () => {
	const [data, setData] = useState({
		chapter: '',
		name: '',
		subcategories: [],
	})
	const [subcats, setSubcats] = useState({
		category: '',
		data: '',
	})
	const history = useHistory()
	const dispatch = useDispatch()
	const [errors, setErrors] = useState({})
	const categories = useSelector(getCategories()).filter(
		(c) => c.chapter === data.chapter
	)

	const handleChange = (e) => {
		setData((prevState) => ({
			...prevState,
			[e.name]: e.value,
		}))
		console.log('data', data)
	}

	const validatorConfog = {
		chapter: {
			isRequired: {
				message: 'Необходимо указать раздел',
			},
		},
		category: {
			isRequired: {
				message: 'Заполните поле',
			},
		},
	}

	useEffect(() => {
		validate()
	}, [data])

	const validate = () => {
		const errors = validator(data, validatorConfog)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}

	const isValid = Object.keys(errors).length === 0

	const handleAddCat = () => {
		dispatch(createCategory(data))
	}

	const handleChangeSubcat = (e) => {
		setSubcats((prev) => ({ ...prev, [e.name]: e.value }))
		console.log(e)
		// const subcats =
	}

	const handleAddSubcat = () => {
		const data = subcats.data.split(', ').map((s) => ({ name: s }))
		// const catData = categories.find((c) => c._id === subcats.category)
		// console.log('subcats data', data)

		data.forEach((s) => dispatch(createSubcat(s)))
	}

	// 	const handleSubmit = (e) => {
	// 		e.preventDefault()
	// 		const isValid = validate()
	// 		if (!isValid) return
	//
	// 		const redirect = history.location.state
	// 			? history.location.state.from.pathname
	// 			: '/'
	//
	// 		// dispath(login({ payload: data, redirect }))
	// 	}

	return (
		<div className='container-sm max-width-300'>
			<form>
				<SelectField
					label='Раздел'
					name='chapter'
					options={[
						{ name: 'Керамика', value: 'ceramics' },
						{ name: 'Эпоксидка', value: 'epoxide' },
					]}
					defaultOption='ceramics'
					onChange={handleChange}
				/>
				<hr className='bg-danger border-2 border-danger' />
				<TextField
					label='Добавить категорию'
					name='name'
					value={data.name}
					onChange={handleChange}
					error={errors.category}
				/>

				<button
					type='button'
					disabled={!isValid}
					className='btn btn-success w-100 mx-auto mb-2'
					onClick={handleAddCat}
				>
					Добавить
				</button>

				<hr className='bg-danger border-2 border-danger' />
			</form>
			<form>
				<SelectField
					label='Категории'
					name='category'
					options={categories.map((c) => ({ name: c.name, value: c._id }))}
					defaultOption=''
					onChange={handleChangeSubcat}
				/>
				<TextField
					label='Добавить подкатегорию (через запятую и пробел)'
					name='data'
					value={subcats.data}
					onChange={handleChangeSubcat}
					error={errors.category}
				/>

				<button
					type='button'
					disabled={!isValid}
					className='btn btn-success w-100 mx-auto mb-2'
					onClick={handleAddSubcat}
				>
					Добавить
				</button>
			</form>
			<button
				type='button'
				disabled={!isValid}
				className='btn btn-danger w-100 mx-auto'
			>
				Удалить
			</button>
		</div>
	)
}

export default CategoryForm
