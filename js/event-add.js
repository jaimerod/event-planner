/** @jsx React.DOM */

var auth = require('./auth');
var DateTime = require('react-datetime');
var EventType = require('./event-type');
var formatDate = require('./utils').formatDate;
var getEvent = require('./utils').getEvent;
var Link = require('react-router').Link;
var Menu = require('./menu');
var moment = require('moment');
var React = require('react');
var saveEvent = require('./utils').saveEvent;

var EventEdit = React.createClass({
	// Sets the Initial State
	getInitialState: function () {
		return getEvent(this.props.params.eventId);
	},

	// Returns true if React should update this component
	shouldComponentsUpdate: function (nextProps, nextState) {
		return true;
	},

	// After we mount the components, do this
	componentDidMount: function () {
		document.getElementById('txt_name').focus();
	},

	forceValidation: function (e) {
		var frm = e.target;
		frm.classList.toggle("dirty", true);
		if (!frm.reportValidity()) {
			document.querySelector('#frm_add-event').submit();
		}
	},

	handleSubmit: function (e) {
		e.preventDefault()

		// Save the event
		saveEvent({
			"id": this.refs.id.value,
			"name": this.refs.name.value,
			"type": this.refs.type.refs.type.value,
			"host": this.refs.host.value,
			"start": this.refs.start.value,
			"end": this.refs.end.value,
			"guests": this.refs.guests.value.split("\n"),
			"location": this.refs.location.value,
			"message": this.refs.message.value,
		});

		// View the results
		this.setState(event, function () {
			this.props.history.replaceState(null, '/event/' + this.refs.id.value);
		});
	},

	// Renders the React Component
	render: function () {
		var that = this;

		var links = [
			{
				'text': 'Back',
				'href': '/'
			}, {
				'text': 'Logout',
				'href': '/logout'
			}
		];

		var saveStart = function (value) {
			that.refs.start.value = value;
		}

		var saveEnd = function (value) {
			that.refs.end.value = value;
		}

		return (
			<div>
				<Menu links={links} />
				<main>
					<h1>Add Event</h1>
					<form id="frm_add-event" onSubmit={this.handleSubmit} onChange={this.forceValidation}>
						<fieldset>
							<legend>*Required Fields</legend>
							<input
								ref="id"
								type="hidden"
								id="txt_id"
								defaultValue={this.state.id} />
							<ul>
								<li>
									<label htmlFor="txt_name">Event Name*</label>
									<input
										autoComplete="name"
										autofocus
										id="txt_name"
										placeholder="e.g., The Smith's Wedding"
										ref="name"
										required
										type="text" />
								</li>
								<EventType ref="type" type={this.state.type} />
								<li>
									<label htmlFor="txt_host">Event hosted by*</label>
									<input
										autoComplete="name"
										id="txt_host"
										placeholder="e.g., Mario Lopez and Dick Clark"
										ref="host"
										required
										type="text" />
								</li>
								<li>
									<label htmlFor="txt_start">When does your event start?*</label>
									<DateTime
										ref="start"
										inputProps={{
											id: "txt_start",
											placeholder: "Click for datepicker",
											required: 1
										}}
										onChange={saveStart} />
								</li>
								<li>
									<label htmlFor="txt_end">When does your event end?*</label>
									<DateTime
										ref="end"
										inputProps={{
											id: "txt_end",
											placeholder: "Click for datepicker",
											required: 1
										}}
										onChange={saveEnd} />
								</li>
								<li>
									<label htmlFor="txt_location">Where is your event?*</label>
									<input
										autoComplete="city"
										id="txt_location"
										placeholder="e.g., Grand Central Station"
										ref="location"
										required
										type="text" />
								</li>
								<li>
									<label htmlFor="txt_guests">Guests to invite*</label>
									<textarea
										id="txt_guests"
										placeholder="One guest per line"
										ref="guests"
										required />
								</li>
								<li>
									<label htmlFor="txt_message">Message to attendees*</label>
									<textarea
										id="txt_message"
										ref="message"
										placeholder="e.g., Come 15 minutes early to get good seats" />
								</li>
								<li>
									<input
										type="submit"
										id="btn_submit"
										value="Create event" />
								</li>
							</ul>
						</fieldset>
					</form>
				</main>
			</div>
		);
	}
});

module.exports = EventEdit;