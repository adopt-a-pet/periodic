import React from 'react'
import PropTypes from 'prop-types'
import Props from 'rsg-components/Props'
import Methods from 'rsg-components/Methods'
import Events from 'rsg-components/Events'
import SlotsTable from 'rsg-components/SlotsTable'
import Syscalls from './Syscalls'

export default function Usage({ props: { props, methods, events, slots, syscalls } }) {
	let slotsNode;

	slots = Object.keys(slots)
		.reduce(
			(acc, slot) => {
				if (!slot.description) return acc;

				return Object.assign(acc, { [name]: slot });
			},
			{}
		);

	if (slots && Object.keys(slots).length > 0) {
		slotsNode = slots && <SlotsTable props={slots} />;
	}

	const propsNode = props && <Props props={props} />;

	let eventsNode;

	if (events && Object.keys(events).length > 0) {
		eventsNode = events && <Events props={events} />;
	}

	const methodsNode = methods && methods.length > 0 && <Methods methods={methods} />;

	let syscallsNode;

	if (syscalls && (Object.keys(syscalls).length > 0)) {
		syscallsNode = <Syscalls props={syscalls} />;
	}

	if (!propsNode && !methodsNode && !slotsNode && !eventsNode && !syscallsNode) {
		return null;
	}

	return (
		<div>
			{propsNode}
			{methodsNode}
			{eventsNode}
			{slotsNode}
			{syscallsNode}
		</div>
	);
};

Usage.propTypes = {
	props: PropTypes.shape({
		props: PropTypes.array
	}).isRequired
};
