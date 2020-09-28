/*
* app.js - Hello World
*/
/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global */
/*var http, server;
http = require( 'http' );
server = http.createServer( function ( request, response ) {
  var response_text = request.url === '/test'
    ? 'you have hit the test page'
    : 'Hello Davide. How are you?';
  response.writeHead( 200, { 'Content-Type': 'text/plain' } );
  response.end( response_text );
}).listen( 3000 );*/

var
http, connectHello, server,
http = require( 'http' ),
connect = require( 'connect' ),
app = connect(),
bodyText = 'Hello Connect';
connectHello = function ( request, response, next ) {
  response.setHeader( 'content-length', bodyText.length );
  response.end( bodyText );
};

app
.use( connectHello );
server = http.createServer( app );
server.listen( 3000 );
console.log( 'Listening on port %d', server.address().port );
