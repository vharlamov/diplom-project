import React, { useState } from 'react'
// import PropTypes from 'prop-types'

const TextField = ({
	placeholder,
	label,
	type,
	acttype,
	name,
	value,
	onChange,
	error,
}) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (e) => {
		e.preventDefault()
		const { target } = e
		onChange({ type: acttype, name: target.name, value: target.value })
	}

	const getInputClasses = () => {
		return 'form-control' + (error ? ' is-invalid' : '')
	}

	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState)
	}

	return (
		<div className='mb-2'>
			<label htmlFor={name} className='form-label mb-0'>
				{' '}
				{label}
			</label>
			<div className='input-group has-validation'>
				<input
					type={showPassword ? 'text' : type}
					placeholder={placeholder}
					id={name}
					name={name}
					value={value}
					onChange={handleChange}
					className={getInputClasses()}
				/>

				{type === 'password' && (
					<button
						className='btn btn-outline-secondary'
						type='button'
						onClick={toggleShowPassword}
					>
						<i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
					</button>
				)}
				{error && <div className='invalid-feedback '>{error}</div>}
			</div>
		</div>
	)
}
// TextField.defaultProps = {
// 	type: 'text',
// }
// TextField.propTypes = {
// 	label: PropTypes.string,
// 	type: PropTypes.string,
// 	name: PropTypes.string,
// 	value: PropTypes.string,
// 	onChange: PropTypes.func,
// 	error: PropTypes.string,
// }

export default TextField
