export function sortProductByOne(products, value, dir) {
	let result = [...products]

	return result.sort((a, b) =>
		dir === 'asc' ? a[[value]] > b[[value]] : a[[value]] < b[[value]]
	)
}
