/** @jsx React.DOM */

var $ = require('jquery');
var auth = require('./auth');
var createHistory = require('history').createHistory;
var data = require('./data');
var Link = require('react-router').Link;
var React = require('react');
var render = require('react-dom').render;
var Route = require('react-router').Route;
var Router = require('react-router').Router;
var Menu = require('./menu');
var useBasename = require('history').useBasename;

/* Pages */
var EditEvent = require('./event-edit');
var AddEvent = require('./event-add');
var Event = require('./event-details');
var Events = require('./event-list');
var Login = require('./login');
var Logout = require('./logout');
var NoMatch = require('./no-match');
var SignUp = require('./sign-up');

var history = useBasename(createHistory)({
	basename: ''
});

// localStorage.removeItem('data');

if (localStorage.getItem('data') === null) {
	console.log('Loading the data');
	localStorage.setItem('data', JSON.stringify(data));
}

var requireAuth = function (nextState, replaceState) {
	if (!auth.loggedIn()) {
		replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
};

var Application = React.createClass({
	// Sets the Initial State
	getInitialState: function () {
		return null;
	},

	render: function () {
		return (
			<Router>
				<Route path="/" component={Events} onEnter={requireAuth} />
				<Route path="/event/new" component={AddEvent} />
				<Route path="/event/:eventId" component={Event} />
				<Route path="/event/:eventId/edit" component={EditEvent} />
				<Route path="login" component={Login} />
				<Route path="logout" component={Logout} />
				<Route path="sign-up" component={SignUp} />
				<Route path="*" component={NoMatch} />
			</Router>
		);
	}
});

window.App = render(
	<Application />,
	document.getElementById('app')
);