"use strict";

const taskHelper = require( "../task-helper" );

const _       = require( "lodash" );
const concat  = require( "gulp-concat" );
const cssnano = require( "gulp-cssnano" );
const gulp    = require( "gulp" );
const gulpIf  = require( "gulp-if" );
const order   = require( "gulp-order" );
const plumber = require( "gulp-plumber" );
const rename  = require( "gulp-rename" );

class CssTask {
	static process( name, source, filename, destination, options ) {
		source = taskHelper.resolveSource( source );
		taskHelper.checkDestination( destination );

		const fn       = ()=> {
			return gulp.src( source )
				.pipe( plumber() )
				.pipe( order( source ) )
				.pipe( concat( `${filename}.css` ) )
				.pipe( gulpIf( !!options.minify, cssnano( {
					zindex : false
				} ) ) )
				.pipe( rename( {
					extname : ".min.css"
				} ) )
				.pipe( gulp.dest( destination ) );
		};
		fn.displayName = name;
		return fn;
	}
}

module.exports = CssTask.process;
