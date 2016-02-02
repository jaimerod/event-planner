/** @jsx React.DOM */
var Event = require('./event-summary');
var React = require('react');
var Menu = require('./menu');

var EventList = React.createClass({
	// Sets the Initial State
	getInitialState: function () {
		return JSON.parse(localStorage.getItem('data'));
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

	componentWillReceiveProps: function(nextProps) {

	},

	// Renders the React Component
	render: function () {
		var links = [
			{
				'text': 'Add',
				'href': '/event/new'
			}, {
				'text': 'Logout',
				'href': '/logout'
			}
		];

		return (
			<div>
				<Menu links={links} />
				<main>
					<h1>Events</h1>
					<ul>
						{this.state.events.map(function (event) {
							return <Event key={event.id} data={event} />
						})}
					</ul>
				</main>
			</div>
		);
	}
});

module.exports = EventList;