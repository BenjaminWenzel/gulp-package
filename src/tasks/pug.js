"use strict";

const taskHelper = require( "../task-helper" );

const _       = require( "lodash" );
const concat  = require( "gulp-concat" );
const gulp    = require( "gulp" );
const plumber = require( "gulp-plumber" );
const pug     = require( "gulp-pug" );

class PugTask{
	static process( name, source, destination, options ) {
		source = taskHelper.resolveSource( source );
		taskHelper.checkDestination( destination );

		const fn       = () => {
			return gulp.src( source )
				.pipe( plumber() )
				.pipe( pug( {
					pretty : !!options.pretty || true
				} ) )
				.pipe( gulp.dest( destination ) );
		};
		fn.displayName = name;
		return fn;
	}
}

module.exports = PugTask.process;
