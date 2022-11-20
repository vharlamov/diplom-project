import { useSelector } from 'react-redux'
import CategoryForm from '../components/categoryForm'
import { getCategories } from '../store/categories'

const ChangeCategory = () => {
	const categories = useSelector(getCategories())

	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3 shadow p-4'>
					<CategoryForm categories={categories} />
				</div>
			</div>
		</div>
	)
}
export default ChangeCategory
