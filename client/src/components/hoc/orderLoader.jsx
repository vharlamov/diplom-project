import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCatLoadingStatus, loadCategoriesList } from '../../store/categories'
import { getChaptersLoading, loadChaptersList } from '../../store/chapters'
import { getOrdersLoadingStatus, loadOrdersList } from '../../store/orders'
import {
	getProductsLoadingStatus,
	loadProductsList,
} from '../../store/products'
import { getShopCart, loadShcart } from '../../store/shopCart'
import { loadUsersList, proofAdmin } from '../../store/users'

const OrderLoader = ({ children }) => {
	const dispatch = useDispatch()
	const usersLoading = useSelector(getChaptersLoading())
	const productsLoading = useSelector(getProductsLoadingStatus())
	const ordersLoading = useSelector(getOrdersLoadingStatus())

	let userLoaded = false

	useEffect(() => {
		dispatch(proofAdmin())
		userLoaded = true
	}, [])

	useEffect(() => {
		dispatch(loadProductsList())
		dispatch(loadShcart())
		dispatch(loadUsersList())
		dispatch(loadOrdersList())
	}, [userLoaded])

	if (usersLoading || productsLoading || ordersLoading) return 'Loading...'
	return children
}

export default OrderLoader
