import React, { useEffect, useState } from 'react'
import { validator } from '../utils/ validator'
import TextField from '../components/common/form/textField'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthErrors, login } from '../store/users'
import CheckBoxField from './common/form/checkBoxField'
import auth from '../services/auth.service'

const LoginForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		stayOn: false,
	})
	const loginError = useSelector(getAuthErrors())
	const history = useHistory()
	const dispath = useDispatch()
	const [errors, setErrors] = useState({})

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validatorConfog = {
		email: {
			isRequired: {
				message: 'Электронная почта обязательна для заполнения',
			},
		},
		password: {
			isRequired: {
				message: 'Пароль обязателкн для заполнения',
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

	const handleSubmit = async (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		// console.log('history location state', history.location.state)
		const redirect = history.location.state
			? history.location.state.from.pathname
			: '/product/goods'

		dispath(login({ payload: data, redirect }))
		// const isAdmin = await auth.proof()
		// console.log('isAdmin', isAdmin)
	}

	return (
		<div className='container-sm max-width-300'>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Электронная почта'
					name='email'
					value={data.email}
					onChange={handleChange}
					error={errors.email}
				/>
				<TextField
					label='Пароль'
					type='password'
					name='password'
					value={data.password}
					onChange={handleChange}
					error={errors.password}
				/>
				<CheckBoxField
					value={data.stayOn}
					onChange={handleChange}
					name='stayOn'
				>
					Оставаться в системе
				</CheckBoxField>
				{loginError && <p className='text-danger'>{loginError}</p>}

				<button
					type='submit'
					disabled={!isValid}
					className='btn btn-primary w-100 mx-auto'
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default LoginForm
