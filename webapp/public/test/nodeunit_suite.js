/*
* nodeunit_suite.js
* Unit test suite for SPA
*
* Please run using /nodeunit <this_file>/
*/
/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa:true */
// third-party modules and globals
/*
const { JSDOM } = require( 'jsdom' );
const { window } = new JSDOM( "" );
global.jQuery = require( 'jquery' )(window);
global.TAFFY = require( '../js/jq/taffy-min.js' ).taffy;
global.$ = global.jQuery;
require( '../js/jq/jquery.event.gevent.js' );
// our modules and globals
global.spa = null;

require( '../js/spa.js' );
require( '../js/spa.util.js' );
require( '../js/spa.fake.js' );
require( '../js/spa.data.js' );
require( '../js/spa.model.js' );
*/
require( './nodeunit_lib.js' );
spa.initModule( $('#spa'));
var $t = $( '<div/>' );

// get the current user object
var currentUser = spa.model.people.get_user();
// confirm it is anonymous
console.log(currentUser.get_is_anon());
// get the people collection
var peopleDb = spa.model.people.get_db();
// show the names of all people in our list
peopleDb().each(function(person, idx){console.log(person.name);});

//esegue il login come Alfred
spa.model.people.login( 'Alfred' );
currentUser = spa.model.people.get_user();
// so confirm the current user is no longer anonymous
console.log(currentUser.get_is_anon());
