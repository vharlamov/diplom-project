import React from 'react'

const SelectField = ({
	label,
	value,
	onChange,
	defaultOption,
	options,
	error,
	name,
	acttype,
}) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value, type: acttype })
	}
	const getInputClasses = () => {
		return 'form-select' + (error ? ' is-invalid' : '')
	}

	const optionsArray =
		!Array.isArray(options) && typeof options === 'object'
			? Object.keys(options).map((optionName) => ({
					name: options[optionName].name,
					value: options[optionName]._id,
			  }))
			: options

	return (
		<div className='mb-2'>
			<label htmlFor='validationCustom04' className='form-label mb-0'>
				{label}
			</label>
			<select
				className={getInputClasses()}
				id='validationCustom04'
				name={name}
				value={value}
				onChange={handleChange}
			>
				<option value={defaultOption.value}>{defaultOption.name}</option>
				{optionsArray &&
					optionsArray.map((option, i) => (
						<option value={option.value} key={i}>
							{option.name}
						</option>
					))}
			</select>
			{error && <div className='invalid-feedback'>{error}</div>}
		</div>
	)
}

export default SelectField
