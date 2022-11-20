import React from 'react'
import TableBody from './tableBody'
import TableHeader from './tableHeader'

const Table = ({ columns, data, children, selectItem }) => {
	return (
		<table className='table table-hover'>
			{children || (
				<>
					<TableHeader {...{ columns }} />
					<TableBody {...{ columns, data, selectItem }} />
				</>
			)}
		</table>
	)
}

export default Table
