'use strict';
var mongodb = require('mongodb'),
	assert = require('assert'),
	url = 'mongodb://localhost',
	options =  { useUnifiedTopology: true },
	dbName = 'spa',
	server = new mongodb.Server(url,27017,options),
	db = new mongodb.Db(dbName, server, { safe : true });
	
	var c = db.collection('user');
	
	c.find().toArray();
	
	
	//db
	
	/*db.collection('user').find().toArray((err,utenti)=>{
				//assert.equal(null,err, (err)?err.message:"unable to find utenti");
				console.log(utenti);
		})*/
	
	