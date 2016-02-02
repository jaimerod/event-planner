var uuid = require('node-uuid');
var moment = require('moment');

var utils = {
	formatDate: function (date) {
		return moment(date).format('MM/DD/YY h:mmA');
	},

	getEvent: function (id) {
		var data = JSON.parse(localStorage.getItem('data'));
		var state;

		// Search for an event
		for (var i = 0; i < data.events.length; i++) {
			if (data.events[i].id == id) {
				state = data.events[i];
			}
		}

		// If it doesn't exist make a new one instead.
		if (typeof state === "undefined") {
			state = {
				"id": uuid.v4(),
				"name": "",
				"type": "",
				"host": "",
				"start": "",
				"end": "",
				"guests": [],
				"location": "",
				"message": ""
			};
		}

		return state;
	},

	saveEvent: function (event) {
		// This flag is set if an identical id is found
		var found = false;

		// Load all the data
		var data = JSON.parse(localStorage.getItem('data'));

		// Check if this event already exists
		for (var i = 0; i < data.events.length; i++) {
			if (data.events[i].id === event.id) {
				found = true;
				// Update the event
				data.events[i] = event;
			}
		}

		if (!found) {
			// Create a new event
			data.events.push(event);
		}

		// Save the data
		localStorage.setItem('data', JSON.stringify(data));
	}
};

module.exports = utils;