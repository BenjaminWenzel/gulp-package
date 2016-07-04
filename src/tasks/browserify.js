"use strict";

const taskHelper = require( "../task-helper" );

const _           = require( "lodash" );
const babelify    = require( "babelify" );
const browserify  = require( "browserify" );
const buffer      = require( "vinyl-buffer" );
const gulp        = require( "gulp" );
const gulpIf      = require( "gulp-if" );
const rename      = require( "gulp-rename" );
const vinylSource = require( "vinyl-source-stream" );
const uglify      = require( "gulp-uglify" );

class BrowserifyTask {
	static process( name, source, filename, destination, options ) {
		source = taskHelper.resolveSource( source );
		taskHelper.checkDestination( destination );
		options        = options || {};
		const fn       = () => {
			return browserify( source )
				.transform( "babelify", {
					presets : [ "es2015" ]
				} )
				.bundle()
				.pipe( vinylSource( `${filename}.js` ) )
				.pipe( buffer() )
				.pipe( gulpIf( !!options.minify, uglify() ) )
				.pipe( rename( {
					extname : ".min.js"
				} ) )
				.pipe( gulp.dest( destination ) );
		};
		fn.displayName = name;
		return fn;
	}
}

module.exports = BrowserifyTask.process;
