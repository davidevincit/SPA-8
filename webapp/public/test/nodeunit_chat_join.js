require( './nodeunit_lib.js' );
spa.initModule( $('#spa'));
var $t = $( '<div/>' );

$.gevent.subscribe( $t, 'spa-login', function () {
console.log( 'Hello!', arguments ); });
$.gevent.subscribe( $t, 'spa-listchange', function () {
console.log( '*Listchange', arguments ); });
// get the current user object
var currentUser = spa.model.people.get_user();
// confirm this is not yet signed-in
console.log(currentUser.get_is_anon());

// try to join chat without being signed-in and return error msg
spa.model.chat.join();
// sign-in, wait 3s. The UI updates too!
spa.model.people.login( 'Fred' );
// get the people collection
var peopleDb = spa.model.people.get_db();
// show the names of all people in the collection.
peopleDb().each(function(person, idx){console.log(person.name);});

// Fred join the chat
spa.model.chat.join();

var peopleDb = spa.model.people.get_db();
peopleDb().each(function(person, idx){console.log(person.name);});
