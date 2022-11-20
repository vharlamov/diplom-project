import React from 'react'

const ControlToggler = ({ onClick }) => {
	return (
		<div
			className='w-100% h-6 d-md-none text-center'
			type='button'
			onClick={onClick}
		>
			<h1>
				<i className='bi bi-list'></i>
			</h1>
		</div>
	)
}

export default ControlToggler
