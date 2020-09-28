/*jslint node : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa:true */
// third-party modules and globals
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
