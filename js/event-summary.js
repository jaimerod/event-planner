/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;

var ReactComponent = React.createClass({
	// Sets the Initial State
	getInitialState: function () {
		return {
			isVisible: true
		}
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
		var event = this.props.data;

		return (
			<li className="event">
				<Link to={'/event/' + event.id}>{event.name}</Link>
			</li>
		);
	}
});

module.exports = ReactComponent;