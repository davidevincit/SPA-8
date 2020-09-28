import Mustache from 'mustache';
import file_txt from './template-shell.htm';

export var spamustache = (function () {
	
  var callMustache =  ($container, configMap) => {
	var html  =  Mustache.render(file_txt, {title: "SPA"});
	configMap.main_html = html;
	$container.html(configMap.main_html);
 }
 
return { callMustache: callMustache };	

}());