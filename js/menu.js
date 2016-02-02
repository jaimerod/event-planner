/** @jsx React.DOM */
var auth = require('./auth');
var Link = require('react-router').Link;
var React = require('react');

var Menu = React.createClass({
	mixins: [ 'History' ],

	// Sets the Initial State
	getInitialState: function () {
		return null;
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
		var links = this.props.links;

		return (
			<nav>
				<ul>
					{links.map(function (item) {
						return (
							<li key={item.text}>
								<Link to={item.href}>{item.text}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}
});

module.exports = Menu;