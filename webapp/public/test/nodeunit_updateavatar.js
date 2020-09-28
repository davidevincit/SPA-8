require( './nodeunit_lib.js' );
spa.initModule( $('#spa'));

var $t = $('<div/>');
// bind functions to test global events
$.gevent.subscribe( $t, 'spa-login', function( event, user ) {
console.log('Hello!', user.name); });

$.gevent.subscribe( $t, 'spa-listchange',
function( event, changed_list ) {
console.log( '*Listchange:', changed_list );
});

// sign-in, wait 3s
spa.model.people.login( 'Jessy' );

setTimeout( function () {
  var person = spa.model.people.get_by_cid( 'id_03' );
  // inspect avatar information
  console.log(JSON.stringify( person.css_map ));

  setTimeout( function () {
    spa.model.chat.update_avatar({person_id : 'id_03', css_map : {} });
    // get Pebbles again
    person = spa.model.people.get_by_cid( 'id_03' );
    // and now inspect
    console.log(JSON.stringify( person.css_map ));
  },4000)

}, 5000);
