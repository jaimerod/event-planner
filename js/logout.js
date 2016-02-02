var React = require('react');
var auth = require('./auth');

var Logout = React.createClass({
	mixins: [ 'History' ],

	getInitialState: function () {
		return {
			'error': false
		}
	},

	componentDidMount: function () {
		auth.clearUser();
		this.props.history.replaceState(null, '/');
	},

	handleSubmit: function (e) {

	},

	'render': function () {
		return (
			<div></div>
		);
	}
});

module.exports = Logout;