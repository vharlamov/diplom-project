import React, { useEffect, useState } from 'react'
import ProductForm from '../components/productForm'
import { useHistory, useParams } from 'react-router-dom'
import SidePanel from '../components/sidePanel'
import ProductsList from '../components/productsList'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../store/products'
import { getIsAdmin, getUsersList, loadUsersList } from '../store/users'
import sortProducts from '../utils/sortProducts'
import { getOrdersList, loadOrdersList } from '../store/orders'

const AdminPage = () => {
	const dispatch = useDispatch()
	const prodList = useSelector(getProductsList())
	const isAdmin = useSelector(getIsAdmin())
	const params = useParams()
	const [product, setProduct] = useState(prodList)
	const [sorted, setSorted] = useState(product)
	const users = useSelector(getUsersList())
	const orders = useSelector(getOrdersList())

	useEffect(() => {
		dispatch(loadOrdersList())
		dispatch(loadUsersList())
	}, [])

	useEffect(() => {
		setProduct(prodList)
	}, [prodList])

	function getPricesMinMax() {
		const prices = product.map((p) => p.price).sort((a, b) => a - b)
		return { min: prices[0], max: prices[prices.length - 1] }
	}

	const onSort = (sortData) => {
		const sortedList = sortProducts(product, sortData, getPricesMinMax().max)

		setSorted(sortedList)
	}

	return (
		<>
			<div className='container-fluid w-100 gap-4 h-100vh d-flex flex-row'>
				<SidePanel
					isAdmin={isAdmin}
					onSort={onSort}
					products={product}
					price={getPricesMinMax()}
				/>
				{params.add || params.id ? (
					<ProductForm />
				) : (
					<ProductsList product={sorted} />
				)}
			</div>
		</>
	)
}

export default AdminPage
