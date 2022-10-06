const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const USERID_KEY = 'user-local-id'
const EXPIRES_KEY = 'jwt-expires'
const SHOP_CART = 'shopcart'

export function setTokens({
	refreshToken,
	accessToken,
	_id,
	expiresIn = 3600,
}) {
	const expiresDate = new Date().getTime() + expiresIn * 1000

	localStorage.setItem(USERID_KEY, _id)
	localStorage.setItem(TOKEN_KEY, accessToken)
	localStorage.setItem(REFRESH_KEY, refreshToken)
	localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY)
}

export function getTokenExpiresDate() {
	return localStorage.getItem(EXPIRES_KEY)
}

export function getUserId() {
	return localStorage.getItem(USERID_KEY)
}

export function removeAuthData() {
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem(REFRESH_KEY)
	localStorage.removeItem(USERID_KEY)
	localStorage.removeItem(EXPIRES_KEY)
}

export function setShopCart(payload) {
	localStorage.setItem(SHOP_CART, payload)
}

export function getShopCart() {
	return localStorage.getItem(SHOP_CART)
}

export function removeShopCart() {
	localStorage.removeItem(SHOP_CART)
}

const localStorageService = {
	getAccessToken,
	getRefreshToken,
	getTokenExpiresDate,
	getUserId,
	removeAuthData,
	setTokens,
	setShopCart,
	getShopCart,
	removeShopCart,
}

export default localStorageService
