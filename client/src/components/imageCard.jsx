import React from 'react'
import config from '../config'

const ImageCard = ({ file, onClick }) => {
	const URL = config + 'uploads/'

	return (
		<div className='container ms-0 me-0 cols-1 col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-3 mx-1'>
			<img src={URL + file} className='col-12' />
			<button
				className='btn btn-danger col-12'
				data-filename={file}
				onClick={onClick}
			>
				Удалить
			</button>
		</div>
	)
}

export default ImageCard
