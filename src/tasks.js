"use strict";

module.exports = {
	clean      : require( "./tasks/clean" ),
	scss       : require( "./tasks/scss" ),
	css        : require( "./tasks/css" ),
	js         : require( "./tasks/js" ),
	browserify : require( "./tasks/browserify" ),
	copy       : require( "./tasks/copy" ),
	pug        : require( "./tasks/pug" ),
	webserver  : require( "./tasks/webserver" )
};
