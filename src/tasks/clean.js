"use strict";

const del        = require( "del" );
const gulp       = require( "gulp" );
const plumber    = require( "gulp-plumber" );
const vinylPaths = require( "vinyl-paths" );

class CleanTask {
	static process( name, source ) {
		const fn       = ()=> {
			return gulp.src( source )
				.pipe( plumber() )
				.pipe( vinylPaths( del ) );
		};
		fn.displayName = name;
		return fn;
	}
}

module.exports = CleanTask.process;
