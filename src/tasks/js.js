"use strict";

const taskHelper = require( "../task-helper" );

const _       = require( "lodash" );
const concat  = require( "gulp-concat" );
const gulp    = require( "gulp" );
const gulpIf  = require( "gulp-if" );
const plumber = require( "gulp-plumber" );
const rename  = require( "gulp-rename" );
const uglify  = require( "gulp-uglify" );

class JavaScriptTask {
	static process( name, source, filename, destination, options ) {
		source = taskHelper.resolveSource( source );
		taskHelper.checkDestination( destination );
		options        = options || {};
		const fn       = ()=> {
			return gulp.src( source )
				.pipe( plumber() )
				.pipe( concat( `${filename}.js` ) )
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

module.exports = JavaScriptTask.process;
