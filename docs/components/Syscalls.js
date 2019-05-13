import React from 'react'
import PropTypes from 'prop-types'
import Argument from 'rsg-components/Argument'
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
	const payload = params[0];

	if (!payload) return null;

	return <Argument {...payload} />;
}

function renderReturns({ returns }) {
	if (!returns) return null;

	return <Argument returns {...returns} />;
}

export const columns = [
	{
		caption: 'Syscall',
		render: renderName
	},
	{
		caption: 'Payload',
		render: renderParams,
	},
	{
		caption: 'Returns',
		render: renderReturns,
	},
	{
		caption: 'Description',
		render: renderDescription,
	},
];

export default function Syscalls({ props }) {
	return <Table columns={columns} rows={propsToArray(props)} getRowKey={getRowKey} />
}

Syscalls.propTypes = {
	props: PropTypes.object.isRequired
}
