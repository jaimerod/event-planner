module.exports = {
	"users": [
		{
			"id": "d675a978-55fa-49da-8499-ce7c9a6f9b1b",
			"first-name": "John",
			"last-name": "Doe",
			"email": "test@example.com",
			"password": "asdf",
			"employer": "Google",
			"Job Title": "Software Developer",
			"Birthday": "04/11/1984"
		}
	],
	"eventTypes": [
		"Birthday",
		"Meeting",
		"Party",
		"Sports Game",
		"Wedding"
	],
	"events": [
		{
			"id": "58505ad6-ca53-421e-901a-a072e2bef21a",
			"name": "Delicious Brunch",
			"type": "Meeting",
			"host": "Jaime Rodriguez",
			"start": "2016-01-19T12:30",
			"end":   "2016-01-19T13:30",
			"guests": [
				"Angelina Jolie",
				"Taylor Swift"
			],
			"location": "My House",
			"message": "Have a espresso,\nAnd a pastry to snack on,\nThan get some dessert."
		}, {
			"id": "d43f1554-b07d-4a63-af27-8a8bc2a0a701",
			"name": "Romantic Dinner",
			"type": "Party",
			"host": "Chez Melange",
			"start": "2016-02-19T18:00",
			"end": "2016-02-19T19:00",
			"guests": [
				"Kate Upton"
			],
			"location": "Mi Casa",
			"message": "Candles set the mood,\nRed wine and charcuterie,\npetals on soft sheets."
		}
	]
};