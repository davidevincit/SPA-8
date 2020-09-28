/*
* app.js - Simple express server
*/
/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global */
// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
http = require( 'http' ),
express = require( 'express' ),
routes = require('./routes.js'),
logger = require('morgan'),
methodOverride = require('method-override'),
bodyParser = require('body-parser'),
errorHandler = require('errorhandler'),
app = express(),
server = http.createServer( app ),
isDevMode = process.env.NODE_ENV==='devlopment',
isProdMode = process.env.NODE_ENV==='production';

// ------------- END MODULE SCOPE VARIABLES ---------------
// ------------- BEGIN SERVER CONFIGURATION ---------------
console.log("Env:" + process.env.NODE_ENV);

app.use(bodyParser.json());
app.use(methodOverride());
if(isDevMode){
  app.use(logger('dev'));
  app.use(errorHandler({
    dumpExceptions : true,
    showStack : true
  }));
}
if(isProdMode){
  app.use( express.errorHandler() );
}
app.use( express.static( __dirname + '/public' ) );

//configura il routing e il db
routes.configRoutes(app, server);

// -------------- END SERVER CONFIGURATION ----------------
// ----------------- BEGIN START SERVER -------------------
server.listen( 3000 );
console.log(
  'Express server listening on port %d in %s mode',
  server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
