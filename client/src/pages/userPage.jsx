import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SidePanel from '../components/sidePanel'
import UserProductWall from '../components/userProductWall'
import { getProductsList } from '../store/products'
import { getShopCart, updateShcart } from '../store/shopCart'
import { getIsAdmin } from '../store/users'
import sortProducts from '../utils/sortProducts'
import ProductPage from './productPage'

const UserPage = () => {
	const dispatch = useDispatch()
	const prodList = useSelector(getProductsList())
	const params = useParams()
	const isAdmin = useSelector(getIsAdmin())
	const shopCart = useSelector(getShopCart())
	const [product, setProduct] = useState(prodList)
	const [sorted, setSorted] = useState(product)
	const [shCart, setShCart] = useState(shopCart)

	useEffect(() => {
		setProduct(prodList)
	}, [prodList])

	useEffect(() => {
		dispatch(updateShcart(shCart))
	}, [shCart])

	const onSort = (sortData) => {
		const sortedList = sortProducts(product, sortData, getPricesMinMax().max)

		setSorted(sortedList)
	}

	const handleShCart = (_id) => {
		const index = shCart.findIndex((shc) => shc._id === _id)
		if (index === -1) {
			setShCart((prev) => [...prev, { _id, quantity: 1 }])
		} else {
			setShCart((prev) => {
				const prod = { ...prev[index] }
				prod.quantity++
				const newShcart = [...prev]
				newShcart[index] = prod
				return newShcart
			})
		}
	}

	function getPricesMinMax() {
		const prices = product.map((p) => p.price).sort((a, b) => a - b)
		return { min: prices[0], max: prices[prices.length - 1] }
	}

	return (
		<div className='container mx-0 px-0 w-100%' style={{ maxWidth: '955px' }}>
			{!params.id ? (
				<div className='row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-xs-1 mx-0 justify-content-center gx-2'>
					<SidePanel
						isAdmin={isAdmin}
						onSort={onSort}
						products={product}
						price={getPricesMinMax()}
					/>
					<UserProductWall products={sorted} handleShCart={handleShCart} />
				</div>
			) : (
				<ProductPage id={params.id} handleShCart={handleShCart} />
			)}
		</div>
	)
}

export default UserPage
