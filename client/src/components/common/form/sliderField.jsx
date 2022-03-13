import React from 'react'

const SliderField = ({ onChange, value, name, minmax, defaultValue }) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}

	return (
		<>
			<div className='d-flex flex-row justify-content-between'>
				<label htmlFor='priceRange' className='form-label'>
					По цене:
				</label>
				<div>
					<span>
						<strong>{value}</strong>
					</span>
				</div>
			</div>
			<input
				type='range'
				className='form-range'
				id='priceRange'
				min={minmax.min}
				max={minmax.max}
				defaultValue={defaultValue}
				name={name}
				onChange={handleChange}
			/>
			<div className='d-flex flex-row justify-content-between'>
				<span>{minmax.min}</span>
				<span>{minmax.max}</span>
			</div>
		</>
	)
}

export default SliderField
