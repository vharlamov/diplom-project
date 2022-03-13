import React, { useEffect, useState } from 'react'
import ProductForm from '../components/productForm'
import { useHistory, useParams } from 'react-router-dom'
import SidePanel from '../components/sidePanel'
import ProductsList from '../components/productsList'
import { useSelector } from 'react-redux'
import { getProductsList } from '../store/products'
import { getIsAdmin } from '../store/users'

const AdminPage = () => {
	const history = useHistory()
	const prodList = useSelector(getProductsList())
	const isAdmin = useSelector(getIsAdmin())
	const params = useParams()
	const [product, setProduct] = useState(prodList)

	useEffect(() => {
		console.log('on sort', product)
	}, [product])

	const onSort = (product) => {
		setProduct(product)
	}

	return (
		<>
			<div className='container-fluid w-100 gap-4 h-100vh d-flex flex-row'>
				<SidePanel isAdmin={isAdmin} onSort={onSort} />
				{params.add || params.id ? (
					<ProductForm />
				) : (
					<ProductsList product={product} />
				)}
			</div>
		</>
	)
}

export default AdminPage
