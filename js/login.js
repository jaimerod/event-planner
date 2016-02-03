var auth = require('./auth');
var Link = require('react-router').Link;
var React = require('react');

var Login = React.createClass({
	mixins: [ 'History' ],

	getInitialState: function () {
		return {
			'error': false
		}
	},

	componentDidMount: function () {
		document.getElementById('txt_email').focus();
	},

	componentWillMount: function () {
		var location = this.props;

		if (!!auth.loggedIn()) {
			if (location.state && location.state.nextPathname) {
				location.history.replaceState(null, location.state.nextPathname);
			} else {
				location.history.replaceState(null, '/');
			}
		}
	},

	handleSubmit: function (e) {
		e.preventDefault()

		var email = this.refs.email.value;
		var pass = this.refs.pass.value;
		var that = this;

		auth.login(email, pass, function (loggedIn, message) {
			var location = that.props;

			if (!loggedIn) {
				return that.setState({
					'error': true,
					'message': message
				});
			}

			if (location.state && location.state.nextPathname) {
				location.history.replaceState(null, location.state.nextPathname);
			} else {
				location.history.replaceState(null, '/');
			}
		});
	},

	forceValidation: function (e) {
		var frm = e.target;
		frm.classList.toggle("dirty", true);
		if (!frm.reportValidity()) {
			document.querySelector('.login').submit();
		}
	},

	render: function () {
		return (
			<div>
				<main>
					<h1>Login</h1>
					<form className="login" onSubmit={this.handleSubmit} onChange={this.forceValidation}>
						<fieldset>
							<ul>
								<li>
									<label htmlFor="txt_email">
										Email Address*
									</label>
									<input
										autoComplete="email"
										autofocus
										id="txt_email"
										ref="email"
										required
										type="email"
										placeholder="e.g., example@me.com" />
								</li>
								<li>
									<label htmlFor="txt_password">
										Password*
									</label>
									<input
										id="txt_password"
										ref="pass"
										required
										type="password"
										placeholder="e.g., ••••••••••••" />
								</li>
								<li>
									<input
										id="btn_submit"
										ref="submit"
										type="submit"
										value="Sign In" />
								</li>
							</ul>
						</fieldset>
						{this.state.error && (
							<p>{this.state.message}</p>
						)}
					</form>
					<p>
						Not Registered? <Link to="/sign-up">Sign Up</Link>
					</p>
				</main>
			</div>
		);
	}
});

module.exports = Login;