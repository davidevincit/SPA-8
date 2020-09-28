
/*global */

'use strict';
fetc
 mongoClient = require("mongodb").MongoClient,
 assert = require('assert'),
 url = 'mongodb://localhost:27017';

mongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
	assert.equal(null, err, 'Unable to connect to database');

	var db = client.db('spa')
	db.collection('user').insertMany([
		{
			"name": "Mike Mikowski",
			"is_online": false,
			"css_map": {
				"top": 100, "left": 120,
				"background-color": "rgb(136, 255, 136)"
			}
		},
		{
			"name": "Mr. Joshua C. Powell, humble humanitarian",
			"is_online": false,
			"css_map": {
				"top": 150, "left": 120,
				"background-color": "rgb(136, 255, 136)"
			}
		},
		{
			"name": "Your name here",
			"is_online": false,
			"css_map": {
				"top": 50, "left": 120,
				"background-color": "rgb(136, 255, 136)"
			}
		},
		{
			"name": "Hapless interloper",
			"is_online": false,
			"css_map": {
				"top": 0, "left": 120,
				"background-color": "rgb(136, 255, 136)"
			}
		}
	],(error, result)=>{
		if(error){
			return console.log('Unable to insert user ')
		}
		
		console.log(result.ops)
	} )
	
});

