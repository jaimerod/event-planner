var React = require('react');
var auth = require('./auth');
var Link = require('react-router').Link;
var Menu = require('./menu');

var SignUp = React.createClass({
	mixins: [ 'History' ],

	getInitialState: function () {
		return {
			'error': false
		}
	},

	componentDidMount: function () {
		document.getElementById('txt_first_name').focus();
	},

	handleSubmit: function (e) {
		e.preventDefault()

		var email = this.refs.email.value;
		var pass = this.refs.pass.value;
		var that = this;

		auth.login(email, pass, function (loggedIn, message) {
			if (!loggedIn) {
				return that.setState({
					'error': true,
					'message': message
				});
			}

			var location = that.props;

			if (location.state && location.state.nextPathname) {
				location.history.replaceState(null, location.state.nextPathname);
			} else {
				location.history.replaceState(null, '/');
			}
		});
	},

	validatePassword: function (e) {
		var input = e.target;
		var value = input.value;
		var requiredSymbol = /[\!\@\#\$\%\^\&\*]/;
		var requiredLowercase = /[a-z]/;
		var requiredUppercase = /[A-Z]/;
		var requiredDigit = /[0-9]/;
		var illegalCharacters = /[^A-z0-9\!\@\#\$\%\^\&\*]/;


		if (input.value.match(requiredDigit) === null) {
			input.setCustomValidity("Passwords must contain a number.");
		} else if (input.value.match(requiredSymbol) === null) {
			input.setCustomValidity("Passwords must contain a symbol. e.g. !, @, #, $, %, ^, &, *");
		} else if (input.value.match(requiredUppercase) === null) {
			input.setCustomValidity("Passwords must contain a uppercase letter.");
		} else if (input.value.match(requiredLowercase) === null) {
			input.setCustomValidity("Passwords must contain a lowercase letter.");
		} else if (input.value.match(illegalCharacters) !== null) {
			input.setCustomValidity("Passwords contains an illegal character. Only these symbols are valid: !, @, #, $, %, ^, &, *");
		} else if (input.value.length < 16) {
			input.setCustomValidity("Password should be a least 16 characters.");
		} else {
			input.setCustomValidity("");
		}
	},

	showMore: function (e) {
		var continueButton = document.getElementById('btn_continue');
		var form = document.querySelector('#app form');
		var optional = document.querySelector('fieldset.optional');
		var submitter = document.getElementById('btn_submit');

		if (form.checkValidity() !== false) {
			continueButton.style.display = 'none';
			optional.style.visibility = 'visible';
		} else {
			submitter.click();
		}
	},

	render: function () {
		var links = [
			{
				'text': 'Login',
				'href': '/login'
			}
		];

		return (
			<div>
				<header>
					<Menu links={links} />
				</header>
				<main>
					<h1>Sign Up</h1>
					<form id="frm_sign-up" onSubmit={this.handleSubmit}>
						<fieldset>
							<legend>*Required Fields</legend>
							<ul>
								<li>
									<label htmlFor="txt_first_name">
										First Name*
									</label>
									<input
										autoComplete="fname"
										autofocus
										id="txt_first_name"
										ref="first_name"
										required
										type="text" />
								</li>
								<li>
									<label htmlFor="txt_last_name">
										Last Name*
									</label>
									<input
										autoComplete="lname"
										id="txt_last_name"
										ref="last_name"
										required
										type="text"	/>
								</li>
								<li>
									<label htmlFor="txt_email">
										Email Address*
									</label>
									<input
										autoComplete="email"
										id="txt_email"
										ref="email"
										required
										type="email" />
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
										onKeyUp={this.validatePassword} />
								</li>
								<li>
									<input
										id="btn_continue"
										onClick={this.showMore}
										ref="continue"
										type="button"
										value="Continue" />
								</li>
							</ul>
						</fieldset>
						<fieldset className="optional">
							<legend>Optional Information</legend>
							<ul>
								<li>
									<label htmlFor="txt_employer">
										Employer
									</label>
									<input
										id="txt_employer"
										ref="employer"
										type="text" />
								</li>
								<li>
									<label htmlFor="txt_job_title">
										Job Title
									</label>
									<input
										id="txt_job_title"
										ref="job_title"
										type="text" />
								</li>
								<li>
									<label htmlFor="txt_birthday">Birthday</label>
									<input
										autoComplete="bday"
										ref="birthday"
										type="date"
										id="txt_birthday"
										placeholder="Birthday" />
								</li>
								<li>
									<input
										id="btn_submit"
										ref="submit"
										type="submit"
										value="Sign Up" />
								</li>
							</ul>
						</fieldset>
						{this.state.error && (
							<p>{this.state.message}</p>
						)}
					</form>
				</main>
			</div>
		);
	}
});

module.exports = SignUp;