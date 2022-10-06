import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCatLoadingStatus, loadCategoriesList } from '../../store/categories'
import { getChaptersLoading, loadChaptersList } from '../../store/chapters'
import { loadOrdersList } from '../../store/orders'
import {
	getProductsLoadingStatus,
	loadProductsList,
} from '../../store/products'
import { getShopCart, loadShcart } from '../../store/shopCart'
import { proofAdmin } from '../../store/users'
// import { getUsersLoadingStatus, loadUsersList } from '../../store/users'

const AppLoader = ({ children }) => {
	const dispatch = useDispatch()
	const chaptersLoading = useSelector(getChaptersLoading())
	const categoriesLoading = useSelector(getCatLoadingStatus())
	const productsLoading = useSelector(getProductsLoadingStatus())

	let userLoaded = false

	useEffect(() => {
		dispatch(proofAdmin())
		userLoaded = true
	}, [])

	useEffect(() => {
		dispatch(loadCategoriesList())
		dispatch(loadProductsList())
		dispatch(loadShcart())
		dispatch(loadChaptersList())
		dispatch(loadOrdersList())
	}, [userLoaded])

	if (categoriesLoading || chaptersLoading || productsLoading) return 'Loading'
	return children
}

export default AppLoader
