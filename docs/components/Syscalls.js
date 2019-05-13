import React from 'react'
import PropTypes from 'prop-types'
import Argument from 'rsg-components/Argument'
import Arguments from 'rsg-components/Arguments'
import Markdown from 'rsg-components/Markdown'
import Name from 'rsg-components/Name'
import Table from 'rsg-components/Table'


const getRowKey = ({ name }) => name;

const propsToArray = props =>
	Object.keys(props)
		.reduce(
			(acc, name) => acc.concat({ ...props[name], name }),
			[]
		);

function renderDescription({ description }) {
	return <div>{description && <Markdown text={description} />}</div>
}

function renderName({ name, tags = {} }) {
	return <Name deprecated={!!tags.deprecated}>{name}</Name>
}

function renderParams({ params = [] }) {
	// return (
	// 	<div>
	// 		{params.map(param => <Argument args={param} />)}
	// 	</div>
	// );
	return <Arguments args={params} />;
}

function renderReturns({ returns }) {
	if (!returns) return;

	const { type } = returns;

	if (type && type.fields) {
		returns.type.name = `{${type.fields.map(
			({ key, value }) => `${key}: ${value.name}`
		).join(', ')}}`
	}

	return <Argument returns {...returns} />;
}

export const columns = [
	{
		caption: 'Syscall',
		render: renderName
	},
	{
		caption: 'Description',
		render: renderDescription,
	},
	{
		caption: 'Syscall Payload',
		render: renderParams,
	},
	{
		caption: 'Returns',
		render: renderReturns,
	},
];

export default function Syscalls({ props }) {
	return <Table columns={columns} rows={propsToArray(props)} getRowKey={getRowKey} />
}

Syscalls.propTypes = {
	props: PropTypes.object.isRequired
}
