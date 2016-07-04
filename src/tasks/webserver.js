"use strict";

const gulp      = require( "gulp" );
const webserver = require( "gulp-webserver" );

class WebServer {
	static process( name, index, options ) {
		options              = options || {};
		const opt            = {};
		opt.livereload       = !!options.livereload || true;
		opt.directoryListing = !!options.directoryListing || false;
		opt.open             = !!options.open || true;
		opt.defaultFile      = options.defaultFile || "index.html";
		opt.port             = options.port || 1337;

		const fn       = ()=> {
			gulp.src( index )
				.pipe( webserver( opt ) );
		};
		fn.displayName = name;
		return fn;
	}
}

module.exports = WebServer.process;
