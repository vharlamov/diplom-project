import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import SidePanel from '../components/sidePanel'
import UserProductList from '../components/userProductList'
import UserProductWall from '../components/userProductWall'
import { getProductsList } from '../store/products'
import { getIsAdmin } from '../store/users'
import ProductPage from './productPage'

const UserPage = () => {
	const params = useParams()
	const history = useHistory()
	const prodList = useSelector(getProductsList())
	const isAdmin = useSelector(getIsAdmin())
	const [products, setProducts] = useState(prodList)

	useEffect(() => {
		const sortedProds = prodList.filter((p) => p.chapter === params.chapter)
		setProducts(sortedProds)
	}, [params])

	const onSort = (products) => {
		setProducts(products)
	}

	return (
		<>
			<div className='d-flex flex-row gap-4 h-100 w-100'>
				<SidePanel isAdmin={isAdmin} onSort={onSort} />
				{params.id ? (
					<ProductPage id={params.id} chapter={params.chapter} />
				) : (
					<UserProductWall chapter={params.chapter} products={products} />
				)}
			</div>
		</>
	)
}

export default UserPage
