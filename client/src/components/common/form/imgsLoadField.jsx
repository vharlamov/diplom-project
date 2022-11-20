import React, { useEffect } from 'react'
import { useState } from 'react'
import config from '../../../config.js'
import imageService from '../../../services/imageService'

const URL = config + 'uploads/'

const ImgsLoadField = ({ label, value, onChange, error }) => {
	const [files, setFiles] = useState([])

	async function handleSubmit(e) {
		e.preventDefault()

		const formData = new FormData(e.target)
		console.log('formData', formData)
		try {
			const { content } = await imageService.createImage(formData)

			setFiles((prev) => [...prev, content])
			onChange(content, 'add')
		} catch (e) {
			console.log(e)
		}
	}

	const handleDelete = async (e) => {
		const target = e.target
		target.closest('div').remove()

		onChange(target.dataset.filename, 'delete')
	}

	return (
		<div className='row mb-4'>
			<form
				onSubmit={handleSubmit}
				onChange={onChange}
				encType='multipart/form-data'
			>
				<div className='col'>
					<label htmlFor='profile_pic' className='mb-3'>
						{label}
					</label>
					<div className='row gap-3 justify-content-end'>
						<input
							type='file'
							className='form-control'
							id='fileElem'
							name='profile_pic'
						/>

						<button
							type='submit'
							name='btn_upload_profile_pic'
							className='btn btn-success'
						>
							Загрузить
						</button>
					</div>
				</div>
			</form>
			<div className='container d-flex flex-row '>
				{files &&
					files.map((file, i) => (
						<div className='d-flex flex-column mt-3 ms-3' key={i}>
							<img src={URL + file} style={{ height: 260 }} />
							<button
								className='btn btn-danger w-50%'
								data-filename={file}
								onClick={handleDelete}
							>
								Удалить
							</button>
						</div>
					))}
			</div>
		</div>
	)
}

export default ImgsLoadField
