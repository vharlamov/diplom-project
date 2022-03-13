import React from 'react'
import TableBody from './tableBody'
import TableHeader from './tableHeader'

const Table = ({ columns, data, children }) => {
	return (
		<table className='table'>
			{children || (
				<>
					<TableHeader {...{ columns }} />
					<TableBody {...{ columns, data }} />
				</>
			)}
		</table>
	)
}

export default Table
