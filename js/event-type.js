/** @jsx React.DOM */

var getEventTypes = require('./utils').getEventTypes;
var React = require('react');

var EventType = React.createClass({
	// Sets the Initial State
	getInitialState: function () {
		return getEventTypes();
	},

	// Returns true if React should update this component
	shouldComponentsUpdate: function (nextProps, nextState) {
		return true;
	},

	// Renders the React Component
	render: function () {
		return (
			<li>
				<label htmlFor="txt_type">Event Type*</label>
				<input
					defaultValue={this.props.type}
					id="txt_type"
					placeholder="e.g. Wedding, birthday, meeting"
					ref="type"
					required
					list="event-types" />
				<datalist id="event-types">
					{this.state.eventTypes.map(function (type) {
						return <option key={type} value={type}></option>;
					})}
				</datalist>
			</li>
		);
	}
});

module.exports = EventType;