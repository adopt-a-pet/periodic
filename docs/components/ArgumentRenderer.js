import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Group from 'react-group';


const typeFieldsToObject = type =>
		type.fields.reduce(
			(acc, { key, value }) =>
				Object.assign(
					acc,
					{ [key]: value.fields ? typeFieldsToObject(value) : value.name }
				),
			{}
		);

const typeFieldsToString = type => JSON.stringify(
	typeFieldsToObject(type),
	null,
	2
).replace(/"/g, '');

export const styles = ({ space }) => ({
	block: {
		marginBottom: space[2],
	},
});

export function ArgumentRenderer({ classes, name, type, description, returns, block, ...props }) {
	const isOptional = type && type.type === 'OptionalType';
	const defaultValue = props.default;
	if (isOptional) {
		type = type.expression;
	}
	const content = (
		<Group>
			{name && (
				<span>
					<Name>{name}</Name>
					{type && ':'}
				</span>
			)}
			{type && (
				<Type>
					{type.fields
							? <pre>{typeFieldsToString(type)}</pre>
							: type.name}
					{isOptional && '?'}
					{!!defaultValue && `=${defaultValue}`}
				</Type>
			)}
			{type && description && `—`}
			{description && <Markdown text={`${description}`} inline />}
		</Group>
	);

	if (block) {
		return <div className={classes.block}>{content}</div>;
	}

	return content;
}

ArgumentRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	type: PropTypes.object,
	default: PropTypes.string,
	description: PropTypes.string,
	returns: PropTypes.bool,
	block: PropTypes.bool,
};

export default Styled(styles)(ArgumentRenderer);