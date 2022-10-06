import categoriesReducer from './categories'
import subcatsReducer from './subcategories'
import usersReducer from './users'
import productsReducer from './products'
import shcartReducer from './shopCart'
import chaptersReducer from './chapters'
import ordersReducer from './orders'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
	categories: categoriesReducer,
	subcategories: subcatsReducer,
	users: usersReducer,
	products: productsReducer,
	shCart: shcartReducer,
	chapters: chaptersReducer,
	orders: ordersReducer,
})

export default function createStore() {
	return configureStore({
		reducer: rootReducer,
	})
}
