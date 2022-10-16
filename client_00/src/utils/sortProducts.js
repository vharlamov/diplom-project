export default function sortProducts(products, data, maxPrice) {
	let result = [...products]

	if (data.chapter !== 'all') {
		result = sortByChapter(result, data.chapter)
	}

	if (data.category !== 'all' && data.category !== '') {
		result = sortByCategory(result, data.category)
		// console.log('category', data.category, result)
	}

	if (data.inStock) {
		result = sortByInStock(result)
		// console.log('inStock', data.inStock, result)
	}

	if (data.price < maxPrice) {
		result = sortByPriceCrop(result, data.price)
		// console.log('priceCrop', data.price, result)
	}

	if (data.discount) {
		result = sortByDiscount(result)
		// console.log('discount', data.discount, result)
	}

	if (data.priceOrder !== 'none') {
		result = sortByPriceOrder(result, data.priceOrder)
		// console.log('priceOrder', data.priceOrder, result)
	}

	// console.log('sortProducts', result)
	return result
}

function sortByCategory(list, value) {
	return list.filter((i) => i.category === value)
}

function sortBySubcategory(list, value) {
	return list.filter((i) => i.category === value)
}

function sortByChapter(list, value) {
	return list.filter((i) => i.chapter === value)
}

function sortByDiscount(list) {
	return list.filter((i) => i.discount)
}

function sortByInStock(list) {
	return list.filter((i) => i.status)
}

function sortByPriceCrop(list, value) {
	return list.filter((i) => i.price <= value)
}

function sortByPriceOrder(list, value) {
	return list.sort((a, b) =>
		value === 'asc' ? a.price - b.price : b.price - a.price
	)
}
