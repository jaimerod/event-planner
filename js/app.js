/** @jsx React.DOM */

var React = require('react'),
	ReactDOM = require('react-dom'),
	Component = require('./component');

console.log(React);

var reactComponent = ReactDOM.render(
	<Component />,
	document.getElementById('app'),
	function () {
		console.log('after render');
	}
)