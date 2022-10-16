import React, { useState } from 'react'

const SliderField = ({ onChange, value, name, minmax }) => {
	const [data, setData] = useState(value)

	const handleChange = ({ target }) => {
		setData(target.value)
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
				value={value}
				id='priceRange'
				min={minmax.min}
				max={minmax.max}
				name={name}
				onChange={handleChange}
				step={50}
			/>
			<div className='d-flex flex-row justify-content-between'>
				<span>{minmax.min}</span>
				<span>{minmax.max}</span>
			</div>
		</>
	)
}

export default SliderField
