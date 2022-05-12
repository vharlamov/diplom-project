import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCatLoadingStatus, loadCategoriesList } from '../../store/categories'
import {
	getProductsLoadingStatus,
	loadProductsList,
} from '../../store/products'
import { getShopCart, loadShcart } from '../../store/shopCart'
import {
	getSubcatLoadingStatus,
	loadSubcatList,
} from '../../store/subcategories'
// import { getUsersLoadingStatus, loadUsersList } from '../../store/users'

const AppLoader = ({ children }) => {
	const dispatch = useDispatch()
	const categoriesLoading = useSelector(getCatLoadingStatus())
	const subcatsLoading = useSelector(getSubcatLoadingStatus())
	const productsLoading = useSelector(getProductsLoadingStatus())
	// const usersLoading = useSelector(getUsersLoadingStatus())

	useEffect(() => {
		dispatch(loadCategoriesList())
		dispatch(loadSubcatList())
		// dispatch(loadUsersList())
		dispatch(loadProductsList())
		dispatch(loadShcart())
	}, [])

	if (categoriesLoading || subcatsLoading || productsLoading) return 'Loading'
	return children
}

export default AppLoader
