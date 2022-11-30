import React, { useEffect, useState } from 'react'
import ProductForm from '../components/productForm'
import { useHistory, useParams } from 'react-router-dom'
import SidePanel from '../components/sidePanel'
import ProductsList from '../components/productsList'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../store/products'
import { getIsAdmin, loadUsersList } from '../store/users'
import sortProducts from '../utils/sortProducts'
import OrdersList from '../components/ordersList'
import OrderControl from '../components/orderControl'

const AdminPage = () => {
	const dispatch = useDispatch()
	const prodList = useSelector(getProductsList())
	const isAdmin = useSelector(getIsAdmin())
	const params = useParams()
	const [product, setProduct] = useState(prodList)
	// const [sorted, setSorted] = useState(product)

	useEffect(() => {
		dispatch(loadUsersList())
	}, [])

	// useEffect(() => {
	// 	setProduct(prodList)
	// }, [prodList])

	function getPricesMinMax() {
		const prices = product.map((p) => p?.price).sort((a, b) => a - b)
		return { min: prices[0], max: prices[prices.length - 1] }
	}

	const onSort = (sortData) => {
		const sortedList = sortProducts(prodList, sortData, getPricesMinMax().max)
		console.log('admin page onSort', sortedList)
		// setSorted(sortedList)
		setProduct(sortedList)
	}

	return (
		<>
			<div className='container mx-0 px-0 w-100%' style={{ maxWidth: '955px' }}>
				<div className='row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-xs-1 w-100% mx-0 justify-content-center gx-2'>
					{params.order && <OrdersList />}
					{params.order && params.id && <OrderControl id={params.id} />}
					<SidePanel
						isAdmin={isAdmin}
						onSort={onSort}
						products={product}
						price={getPricesMinMax()}
					/>
					{params.add || params.id ? (
						<ProductForm />
					) : (
						<ProductsList product={product} />
					)}
				</div>
			</div>
		</>
	)
}

export default AdminPage
