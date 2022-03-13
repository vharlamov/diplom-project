import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadProductsList } from '../../store/products'

const ProductsLoader = ({ children }) => {
	const dataStatus = useSelector(getDataStatus())
	const dispatch = useDispatch()

	useEffect(() => {
		if (!dataStatus) {
			dispatch(loadProductsList())
		}
	}, [])

	if (!dataStatus) return 'Loading...'

	return children
}

export default ProductsLoader
