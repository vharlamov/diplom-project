import React from 'react'
import _ from 'lodash'

const TableBody = ({ data, columns }) => {
	const renderContent = (item, column) => {
		if (columns[column].component) {
			const component = columns[column].component
			if (typeof component === 'function') {
				return component(item)
			}

			return component
		}

		return _.get(item, columns[column].path)
	}

	return (
		<tbody>
			{data.map((item) => (
				<tr key={item._id}>
					{Object.keys(columns).map((column) => (
						<td
							key={column}
							className={
								columns[column].class ? columns[column].class : 'col-2 ms-0'
							}
						>
							{renderContent(item, column)}
						</td>
					))}
				</tr>
			))}
		</tbody>
	)
}

export default TableBody
