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
		var error = false;
		var value = input.value;
		var requiredSymbol = /[\!\@\#\$\%\^\&\*]/;
		var requiredLowercase = /[a-z]/;
		var requiredUppercase = /[A-Z]/;
		var requiredDigit = /[0-9]/;
		var illegalCharacters = /[^A-z0-9\!\@\#\$\%\^\&\*]/;

		document.querySelector('#validDigit').style.display = "none";
		document.querySelector('#validSymbol').style.display = "none";
		document.querySelector('#validUpper').style.display = "none";
		document.querySelector('#validLower').style.display = "none";
		document.querySelector('#validExtra').style.display = "none";
		document.querySelector('#validLength').style.display = "none";


		if (input.value.match(requiredDigit) === null) {
			document.querySelector('#validDigit').style.display = "block";
			error = true;
		}
		if (input.value.match(requiredSymbol) === null) {
			document.querySelector('#validSymbol').style.display = "block";
			error = true;
		}
		if (input.value.match(requiredUppercase) === null) {
			document.querySelector('#validUpper').style.display = "block";
			error = true;
		}
		if (input.value.match(requiredLowercase) === null) {
			document.querySelector('#validLower').style.display = "block";
			error = true;
		}
		if (input.value.match(illegalCharacters) !== null) {
			document.querySelector('#validExtra').style.display = "block";
			error = true;
		}
		if (input.value.length < 6) {
			document.querySelector('#validLength').style.display = "block";
			error = true;
		}

		if (error) {
			input.setCustomValidity(" ");
		} else {
			input.setCustomValidity("");
		}
	},

	validateEmail: function (e) {
		var input = e.target;
		var error = false;
		var value = input.value;
		var requiredSymbol = /[\@]/;
		var requiredAfter = /[\@][0-1a-z]/;


		document.querySelector('#validAt').style.display = "none";
		document.querySelector('#validAtAfter').style.display = "none";

		if (input.value.match(requiredSymbol) === null) {
			document.querySelector('#validAt').style.display = "block";
			error = true;
		}
		if (input.value.match(requiredAfter) === null) {
			document.querySelector('#validAtAfter').style.display = "block";
			error = true;
		}

		if (error) {
			input.setCustomValidity(" ");
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

	forceValidation: function (e) {
		var frm = e.target;
		frm.classList.toggle("dirty", true);
		if (!frm.reportValidity()) {
			document.querySelector('#frm_sign-up').submit();
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
					<form id="frm_sign-up" onSubmit={this.handleSubmit} onChange={this.forceValidation}>
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
										type="text"
										placeholder="e.g., John" />
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
										type="text"
										placeholder="e.g., Doe"	/>
								</li>
								<li>
									<label htmlFor="txt_email">
										Email Address*
									</label>
									<input
										autoComplete="email"
										id="txt_email"
										onChange={this.validateEmail}
										ref="email"
										required
										type="text"
										placeholder="e.g., example@me.com" />
										<p className="validEmail">
											<span id="validAt">Please enter an @ sign.<br /></span>
											<span id="validAtAfter">Enter a domain after the @ sign.</span>
										</p>
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
										onChange={this.validatePassword}
										placeholder="e.g., ••••••••••••" />
										<p className="validPassword">
											<span id="validDigit">Password must contain a number.<br /></span>
											<span id="validSymbol">Password must contain a symbol. e.g. !, @, #, $, %, ^, &, *<br /></span>
											<span id="validUpper">Password must contain a uppercase letter.<br /></span>
											<span id="validLower">Password must contain a lowercase letter.<br /></span>
											<span id="validExtra">Password contains an illegal character. Only these symbols are valid: !, @, #, $, %, ^, &amp;, *<br /></span>
											<span id="validLength">Password should be a least 6 characters.</span>
										</p>
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
										type="text"
										placeholder="e.g., Acme, Inc."/>
								</li>
								<li>
									<label htmlFor="txt_job_title">
										Job Title
									</label>
									<input
										id="txt_job_title"
										ref="job_title"
										type="text"
										placeholder="e.g., Anvil Maker" />
								</li>
								<li>
									<label htmlFor="txt_birthday">Birthday</label>
									<input
										autoComplete="bday"
										ref="birthday"
										type="date"
										id="txt_birthday"
										placeholder="e.g., 01/01/1990" />
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