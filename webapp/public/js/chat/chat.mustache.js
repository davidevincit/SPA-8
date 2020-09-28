import Mustache from 'mustache';
import file_txt from './template-chat.htm';

export var chat_mustache = (function () {
	
  var callMustache =  ($target, configMap) => {
	var html  =  Mustache.render(file_txt, {toggle:'+', title: 'CHAT'});
	configMap.main_html = html;
	console.log(configMap.main_html);
	$target.append(configMap.main_html);
 }
 
return { callMustache: callMustache };	

}());