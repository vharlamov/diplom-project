import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import { Router } from 'react-router-dom'
// import { createStore } from './store/createStore'
import { Provider } from 'react-redux'
import history from './utils/history'
import { BrowserRouter } from 'react-router-dom'
import createStore from './store/createStore'

const store = createStore()

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
)
