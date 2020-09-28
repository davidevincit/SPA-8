/*
* socket.js - simple socket.io example
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
  //countUp,
  setWatch,
  http = require('http'),
  express = require('express'),
  socketIo = require('socket.io'),
  fsHandle = require('fs'),
  app = express(),
  server = http.createServer(app),
  io = socketIo.listen(server),
  //countIdx = 0,
  watchMap = {};

// ------------- END MODULE SCOPE VARIABLES ---------------
// --------------- BEGIN UTILITY METHODS ------------------

setWatch = function(url_path, file_type) {
  console.log('setWatch called on ' + url_path);
  if (!watchMap[url_path]) {
    fsHandle.watchFile(
      "data.js",
      {
        // Specify the use of big integers
        // in the Stats object
        bigint: false,
        // Specify if the process should
        // continue as long as file is
        // watched
        persistent: true,
        // Specify the interval between
        // each poll the file
        interval: 4000,
      },
      function(current, previous) {
        //console.log('setting watch on ' + url_path.slice(1));
        //console.log('file accessed');
        if (current.mtime !== previous.mtime) {
          console.log('file changed');
          io.sockets.emit(file_type, "data.js");
        }
      }
    );
    watchMap[url_path] = true;
  }
};

/*countUp = function() {
  countIdx++;
  //console.log( countIdx );
  io.sockets.send(countIdx);
};*/
// ---------------- END UTILITY METHODS -------------------
// ------------- BEGIN SERVER CONFIGURATION ---------------
app.use(function(request, response, next) {
  if (request.url.indexOf('/js/') >= 0) {
    setWatch(request.url, 'script');
  }
  else if (request.url.indexOf('/css/') >= 0) {
    setWatch(request.url, 'stylesheet');
  }
  next();
});
app.use(express.static(__dirname + '/'));
app.get('/', function(request, response) {
  response.redirect('/socket.html');
});
// -------------- END SERVER CONFIGURATION ----------------
// ----------------- BEGIN START SERVER -------------------
server.listen(3000);
console.log(
  'Express server listening on port %d in %s mode',
  server.address().port, app.settings.env
);
//setInterval( countUp, 1000 );
