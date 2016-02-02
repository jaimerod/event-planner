/** @jsx React.DOM */
var formatDate = require('./utils').formatDate;
var getEvent = require('./utils').getEvent;
var Link = require('react-router').Link;
var Menu = require('./menu');
var React = require('react');

var EventDetails = React.createClass({
	// Sets the Initial State
	getInitialState: function () {
		return getEvent(this.props.params.eventId);
	},

	// Returns true if React should update this component
	shouldComponentsUpdate: function (nextProps, nextState) {
		return true;
	},

	// Before we mount the components, do this
	componentWillMount: function () {

	},

	// Before we remove the components, do this
	componentWillUnmount: function () {

	},

	// After we mount the components, do this
	componentDidMount: function () {

	},

	componentWillReceiveProps: function (nextProps) {

	},

	// Renders the React Component
	render: function () {
		var links = [
			{
				'text': 'Back',
				'href': '/'
			}, {
				'text': 'Edit',
				'href': "/event/" + this.state.id + "/edit"
			}, {
				'text': 'Logout',
				'href': '/logout'
			}
		];

		return (
			<div>
				<Menu links={links} />
				<main>
					<h1>{this.state.name}</h1>
					<h3>Type of event:</h3>
					<p>{this.state.type}</p>
					<h3>Hosted by:</h3>
					<p>{this.state.host}</p>
					<h3>When:</h3>
					<p>{formatDate(this.state.start)} to {formatDate(this.state.end)}</p>
					<h3>Guests list:</h3>
					<ul>
						{this.state.guests.map(function (name) {
							return <li key={name}>{name}</li>;
						})}
					</ul>
					<h3>Message to guests:</h3>
					<pre>{this.state.message}</pre>
				</main>
			</div>
		);
	}
});

module.exports = EventDetails;