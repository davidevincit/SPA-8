/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa */
import 'jquery';
import '../css/spa.css';
import '../css/spa.shell.css';

import {spachat} from './spa.chat.js';
import {spamodel} from './spa.model.js';
import {spa_avtr} from './spa.avtr.js';
import {spamustache} from './shell/shell.mustache.js';
import './jq/jquery.uriAnchor.js';
import './jq/jquery.event.gevent.js';
import './jq/jquery.event.ue.js';


export var spashell = (function() {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      anchor_schema_map: {
        chat: { opened: true, closed: true }
      },
      resize_interval : 200,
	  main_html: String()
    },
    //stato
    stateMap = {
      $container : undefined,
      anchor_map: {},
      resize_idto : undefined
      //is_chat_retracted : true
    },
    jqueryMap = {},
    //define name methods
    copyAnchorMap, setJqueryMap, //toggleChat,
    changeAnchorPart, onHashchange,onResize,
    onTapAcct, onLogin, onLogout,
    setChatAnchor, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------
  //-------------------- BEGIN UTILITY METHODS -----------------
  // Returns copy of stored anchor map; minimizes overhead
  copyAnchorMap = function() {
    return $.extend(true, {}, stateMap.anchor_map);
  };
  //--------------------
  //--------------------- END UTILITY METHODS ------------------
  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function() {
    var $container = stateMap.$container;
    //cache degli div-id del containne e lo slider
    jqueryMap = {
      $container: $container,
      $acct : $container.find('.spa-shell-head-acct'),
      $nav : $container.find('.spa-shell-main-nav')
    };
  };
  // Begin callback method /setChatAnchor/
  // Example : setChatAnchor( 'closed' );
  // Purpose : Change the chat component of the anchor
  // Arguments:
  // * position_type - may be 'closed' or 'opened'
  // Action :
  // Changes the URI anchor parameter 'chat' to the requested
  // value if possible.
  // Returns :
  // * true - requested anchor part was updated
  // * false - requested anchor part was not updated
  // Throws : none
  //

  // Begin DOM method /changeAnchorPart/
  // Purpose : Changes part of the URI anchor component
  // Arguments:
  // * arg_map - The map describing what part of the URI anchor
  // we want changed.
  // Returns : boolean
  // * true - the Anchor portion of the URI was update
  // * false - the Anchor portion of the URI could not be updated
  // Action :
  // The current anchor rep stored in stateMap.anchor_map.
  // See uriAnchor for a discussion of encoding.
  // This method
  // * Creates a copy of this map using copyAnchorMap().
  // * Modifies the key-values using arg_map.
  // * Manages the distinction between independent
  // and dependent values in the encoding.
  // * Attempts to change the URI using uriAnchor.
  // * Returns true on success, and false on failure.
  //
  changeAnchorPart = function(arg_map) {
    var
      anchor_map_revise = copyAnchorMap(),
      bool_return = true,
      key_name, key_name_dep;
    // Begin merge changes into anchor map
    KEYVAL:
    for (key_name in arg_map) {
      if (arg_map.hasOwnProperty(key_name)) {
        // skip dependent keys during iteration
        if (key_name.indexOf('_') === 0) { continue KEYVAL; }
        // update independent key value
        anchor_map_revise[key_name] = arg_map[key_name];
        // update matching dependent key
        key_name_dep = '_' + key_name;
        if (arg_map[key_name_dep]) {
          anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
        }
        else {
          delete anchor_map_revise[key_name_dep];
          delete anchor_map_revise['_s' + key_name_dep];
        }
      }
    }
    // End merge changes into anchor map
    // Begin attempt to update URI; revert if not successful
    try {
      $.uriAnchor.setAnchor(anchor_map_revise);
    }
    catch (error) {
      // replace URI with existing state
      $.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
      bool_return = false;
    }
    // End attempt to update URI...
    return bool_return;
  };
  // End DOM method /changeAnchorPart/
  //--------------------- END DOM METHODS ----------------------
  //------------------- BEGIN EVENT HANDLERS -------------------
  // Begin Event handler /onHashchange/
  // Purpose : Handles the hashchange event
  // Arguments:
  // * event - jQuery event object.
  // Settings : none
  // Returns : false
  // Action :
  // * Parses the URI anchor component
  // * Compares proposed application state with current
  // * Adjust the application only where proposed state
  // differs from existing and is allowed by anchor schema
  //
  onHashchange = function(event) {
    var
      _s_chat_previous, _s_chat_proposed, s_chat_proposed,
      anchor_map_proposed,
      is_ok = true,
      anchor_map_previous = copyAnchorMap();
    // attempt to parse anchor
    try { anchor_map_proposed = $.uriAnchor.makeAnchorMap(); }
    catch (error) {
      $.uriAnchor.setAnchor(anchor_map_previous, null, true);
      return false;
    }
    stateMap.anchor_map = anchor_map_proposed;
    // convenience vars
    _s_chat_previous = anchor_map_previous._s_chat;
    _s_chat_proposed = anchor_map_proposed._s_chat;
    // Begin adjust chat component if changed
    if (!anchor_map_previous
      || _s_chat_previous !== _s_chat_proposed
    ) {
      s_chat_proposed = anchor_map_proposed.chat;
      switch (s_chat_proposed) {
        case 'opened':
          //toggleChat(true);
          is_ok = spachat.setSliderPosition( 'opened' );
          break;
        case 'closed':
          //toggleChat(false);
          is_ok = spachat.setSliderPosition( 'closed' );
          break;
        default:
          //toggleChat(false);
          spachat.setSliderPosition( 'closed' );
          delete anchor_map_proposed.chat;
          $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
      }
    }
    // Begin revert anchor if slider change denied
    if ( ! is_ok ){
      if ( anchor_map_previous ){
        $.uriAnchor.setAnchor( anchor_map_previous, null, true );
        stateMap.anchor_map = anchor_map_previous;
      } else {
        delete anchor_map_proposed.chat;
        $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
      }
    }
    // End revert anchor if slider change denied
    // End adjust chat component if changed
    return false;
  };
  // End Event handler /onHashchange/

  // Begin Event handler /onResize/
  onResize = function (){
    if ( stateMap.resize_idto ){ return true; }
    spachat.handleResize();
    stateMap.resize_idto = setTimeout(
      function (){ stateMap.resize_idto = undefined; },
      configMap.resize_interval
    );
    return true;
  };
  // End Event handler /onResize/
  onTapAcct = function ( ) {
    var user_name, user = spamodel.people.get_user();
    if ( user.get_is_anon() ) {
        user_name = prompt( 'Please sign-in' );
        if(user_name){
          spamodel.people.login( user_name );
          jqueryMap.$acct.text( '... processing ...' );
        }
      }
      else {
        spamodel.people.logout();
      }
    return false;
  };
  onLogin = function ( event, login_user ) {
    jqueryMap.$acct.text( login_user.name.toUpperCase() );
  };
  onLogout = function () {
    jqueryMap.$acct.text( 'Please sign-in' );
  };
  //-------------------- END EVENT HANDLERS --------------------
  //---------------------- BEGIN CALLBACKS ---------------------
  // Begin callback method /setChatAnchor/
  // Example : setChatAnchor( 'closed' );
  // Purpose : Change the chat component of the anchor
  // Arguments:
  // * position_type - may be 'closed' or 'opened'
  // Action :
  // Changes the URI anchor parameter 'chat' to the requested
  // value if possible.
  // Returns :
  // * true - requested anchor part was updated
  // * false - requested anchor part was not updated
  // Throws : none
  setChatAnchor = function ( position_type ){
    return changeAnchorPart({ chat : position_type });
  };
  // End callback method /setChatAnchor/
  //----------------------- END CALLBACKS ----------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example : spashell.initModule( $('#app_div_id') );
  // Purpose :
  // Directs the Shell to offer its capability to the user
  // Arguments :
  // * $container (example: $('#app_div_id')).
  // A jQuery collection that should represent
  // a single DOM container
  // Action :
  // Populates $container with the shell of the UI
  // and then configures and initializes feature modules.
  // The Shell is also responsible for browser-wide issues
  // such as URI anchor and cookie management.
  // Returns : none
  // Throws : none
  initModule = function($container) {
    stateMap.$container = $container;
    //aggiunge i div dei diversi containers
    spamustache.callMustache($container,configMap);
    setJqueryMap();
    /*
    stateMap.is_chat_retracted = true;
    jqueryMap.$chat
      .attr('title', configMap.chat_retracted_title)
      .click(onClickChat);
      */
    // configure uriAnchor to use our schema
    $.uriAnchor.configModule({
      schema_map: configMap.anchor_schema_map
    });
    // configure and initialize feature modules
    //spachat.configModule({});
    //spachat.initModule(jqueryMap.$chat);
    spachat.configModule({
      set_chat_anchor : setChatAnchor,
      chat_model : spamodel.chat,
      people_model : spamodel.people
    });
    spachat.initModule( jqueryMap.$container );
    spa_avtr.configModule({
      chat_model : spamodel.chat,
      people_model : spamodel.people
    });
    spa_avtr.initModule( jqueryMap.$nav );
    // Handle URI anchor change events.
    // This is done /after/ all feature modules are configured
    // and initialized, otherwise they will not be ready to handle
    // the trigger event, which is used to ensure the anchor
    // is considered on-load
    //
    $(window)
      .bind( 'resize', onResize )
      .bind('hashchange', onHashchange)
      .trigger('hashchange');

      $.gevent.subscribe( $container, 'spa-login', onLogin );
      $.gevent.subscribe( $container, 'spa-logout', onLogout );
      jqueryMap.$acct
      .text( 'Please sign-in')
      .bind( 'utap', onTapAcct );


  };
  // End PUBLIC method /initModule/
  return { initModule: initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
