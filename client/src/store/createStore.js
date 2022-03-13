import categoriesReducer from './categories'
import subcatsReducer from './subcategories'
import usersReducer from './users'
import productsReducer from './products'
import shcartReducer from './shopCart'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
	categories: categoriesReducer,
	subcategories: subcatsReducer,
	users: usersReducer,
	products: productsReducer,
	shCart: shcartReducer,
})

export default function createStore() {
	return configureStore({
		reducer: rootReducer,
	})
}
