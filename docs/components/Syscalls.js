import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'rsg-components/Markdown'
import Name from 'rsg-components/Name'
import Table from 'rsg-components/Table'

function renderDescription(prop) {
	const { description } = prop
	return <div>{description && <Markdown text={description} />}</div>
}

function renderName(prop) {
	const { name, tags = {} } = prop
	return <Name deprecated={!!tags.deprecated}>{name}</Name>
}

export function getRowKey(row) {
	return row.name
}

export function propsToArray(props) {
	return Object.keys(props)
		.reduce(
			(acc, name) => acc.concat({ ...props[name], name }),
			[]
		);
}

export const columns = [
	{
		caption: 'Syscall',
		render: renderName
	},
	{
		caption: 'Description',
		render: renderDescription
	}
]

// rows={propsToArray(props)}
export default function Syscalls({ props }) {
	console.log(props);
	return <Table columns={columns} rows={propsToArray(props)} getRowKey={getRowKey} />
}

Syscalls.propTypes = {
	props: PropTypes.object.isRequired
}
