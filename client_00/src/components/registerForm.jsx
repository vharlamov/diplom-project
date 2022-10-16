import React, { useEffect, useState } from 'react'
import { validator } from '../utils/ validator'
import TextField from '../components/common/form/textField'
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../store/users'
import { useHistory } from 'react-router-dom'

const RegisterForm = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [data, setData] = useState({
		email: '',
		password: '',
		name: '',
	})

	const [errors, setErrors] = useState({})

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validatorConfig = {
		email: {
			isRequired: {
				message: 'Электронная почта обязательна для заполнения',
			},
			isEmail: {
				message: 'Email введен некорректно',
			},
		},
		name: {
			isRequired: {
				message: 'Имя обязательно для заполнения',
			},
			min: {
				message: 'Имя должено состаять миниму из 3 символов',
				value: 3,
			},
		},
		password: {
			isRequired: {
				message: 'Пароль обязательна для заполнения',
			},
			isCapitalSymbol: {
				message: 'Пароль должен содержать хотя бы одну заглавную букву',
			},
			isContainDigit: {
				message: 'Пароль должен содержать хотя бы одно число',
			},
			min: {
				message: 'Пароль должен состаять миниму из 8 символов',
				value: 8,
			},
		},
	}

	useEffect(() => {
		validate()
	}, [data])

	const validate = () => {
		const errors = validator(data, validatorConfig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const isValid = Object.keys(errors).length === 0

	const handleSubmit = (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		const redirect = history.location.state
			? history.location.state.from.pathname
			: '/'

		dispatch(signUp({ payload: data, redirect }))
	}

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label='Электронная почта'
				name='email'
				value={data.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				label='Имя'
				name='name'
				value={data.name}
				onChange={handleChange}
				error={errors.name}
			/>
			<TextField
				label='Пароль'
				type='password'
				name='password'
				value={data.password}
				onChange={handleChange}
				error={errors.password}
			/>
			<button
				type='submit'
				disabled={!isValid}
				className='btn btn-primary w-100 mx-auto'
			>
				Submit
			</button>
		</form>
	)
}

export default RegisterForm
