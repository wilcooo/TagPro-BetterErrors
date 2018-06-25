// ==UserScript==
// @name         TagPro Better Errors
// @description  See the details whenever an error occures
// @author       Ko
// @version      1.0
// @download     https://raw.githubusercontent.com/wilcooo/TagPro-BetterErrors/master/tpbe.user.js
// @supportURL   https://www.reddit.com/message/compose/?to=Wilcooo
// @include      http://tagpro-*.koalabeast.com:*
// @include      http://tangent.jukejuice.com:*
// @include      http://*.newcompte.fr:*
// @grant        none
// @license      MIT
// ==/UserScript==

var show_all = true;

tagpro.ready(function() {

    var org_on = tagpro.socket.on;

    tagpro.socket.on = function( event, handler ) {
        var wrapper = function() {
            try { handler(...arguments); }
            catch(e) {
                console.error("Unhandled socket.io on() error. Mod makers, handle your errors!");
                console.error( { event: event, handler: handler, data: arguments[0] } );
                console.error(e);
                if (!show_all) tagpro.rawSocket.removeListener(event, wrapper);
            }
        };
        org_on( event, wrapper );
    };

});
