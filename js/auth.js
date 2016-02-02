var $ = require('jquery');

var auth = {
	login: function (email, pass, cb) {
		localStorage.setItem('token', 'ASDF');
		localStorage.setItem('user_id', 1);

		if (typeof cb !== 'undefined') {
			cb(true, "Success!");
		}
	},
	clearUser: function () {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('user_id');
	},
	logout: function (cb, message) {
		this.clearUser();

		if (typeof cb !== 'undefined') {
			cb(false, message);
		}

		this.onChange(false);
	},
	loggedIn: function () {
		return !!localStorage.getItem('token');
	},
	onChange: function () {}
};

module.exports = auth;