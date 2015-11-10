/** @jsx React.DOM */
var React = require('react');

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
		var inlineStyles = {
			display: this.state.isVisible ? 'block' : 'none'
		};

		return (
			<h1 style={inlineStyles}>Hello, World!</h1>
		);
	}
});

module.exports = ReactComponent;