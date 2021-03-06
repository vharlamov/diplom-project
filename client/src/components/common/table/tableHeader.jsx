import React from 'react'

const TableHeader = ({ columns }) => {
	return (
		<thead>
			<tr>
				{Object.keys(columns).map((column) => (
					<th
						key={column}
						onClick={
							columns[column].path
								? () => handleSort(columns[column].path)
								: undefined
						}
						{...{ role: columns[column].path && 'button' }}
						scope='col'
					>
						{columns[column].name}
					</th>
				))}
			</tr>
		</thead>
	)
}

export default TableHeader
