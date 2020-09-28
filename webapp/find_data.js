'use strict';
var
 mongoClient = require('mongodb').MongoClient,
 assert = require('assert'),
 url = 'mongodb://localhost:27017',
 options =  { useUnifiedTopology: true },
 dbName = 'spa';
	
 mongoClient.connect(url,options, (err,client)=>{
 	assert.equal(null,err, 'unable to connect');
 	var db = client.db(dbName);
	db.collection('user').find().toArray((err,utenti)=>{
			assert.equal(null,err, (err)?err.message:"unable to find utenti");
			console.log(utenti);
	})
 })