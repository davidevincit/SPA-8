/*
* spa.js
* Root namespace module
*/
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa:true */
import {spamodel} from './spa.model.js';
import {spashell} from './spa.shell.js';
/**
Qui vanno letti i template relativi alla shell, cioè li legge il chiamante, 
perchè è una lettura asincrona quindi se va male non può costruire la pagina 
 */
export var spa = (
	function () {
  
	
	var initModule = function ( $container ) {
    
	console.log("Dentro SPA")
	//spa.data.initModule();
    spamodel.initModule();
    if ( spashell && $container ) {
	//mustache async 
      spashell.initModule($container);
    }
  };
return { initModule: initModule };
}());
