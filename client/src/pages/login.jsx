import React, { useState } from 'react'
import { useParams } from 'react-router'
import LoginForm from '../components/loginForm'
import RegisterForm from '../components/registerForm'

const Login = () => {
	const { type } = useParams()
	const [formType, setFormType] = useState(type === 'register' ? type : 'login')

	const toggleFormType = () => {
		setFormType((prevState) =>
			prevState === 'register' ? 'login' : 'register'
		)
	}

	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3 shadow p-4'>
					{formType === 'register' ? (
						<>
							<h3 className='mb-4'>Register</h3>
							<RegisterForm />
							<p>
								Already have account?{' '}
								<a role='button' onClick={toggleFormType}>
									{' '}
									Sign In
								</a>
							</p>
						</>
					) : (
						<div className='container'>
							<h3 className='mb-4'>Login</h3>
							<LoginForm />
							<div className='row justify-content-end'>
								<div className='col mt-3'>
									<p>
										Нет аккаунта?{' '}
										<a
											role='button'
											className='text-bold color-danger'
											onClick={toggleFormType}
										>
											{' '}
											Зарегистрируйтесь!
										</a>
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
export default Login
