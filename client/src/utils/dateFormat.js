export default function dateFormat(input) {
	const parts = input.split('-')
	const day = parts[2].slice(0, 2)
	const month = parts[1]
	const year = parts[0]

	return `${day}.${month}.${year}`
}
