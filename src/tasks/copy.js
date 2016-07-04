"use strict";

const taskHelper = require( "../task-helper" );

const _       = require( "lodash" );
const gulp    = require( "gulp" );
const plumber = require( "gulp-plumber" );

class CopyTask {
	static process( name, source, destination ) {
		source = taskHelper.resolveSource( source );
		taskHelper.checkDestination( destination );

		const fn       = ()=> {
			return gulp.src( source )
				.pipe( plumber() )
				.pipe( gulp.dest( destination ) );
		};
		fn.displayName = name;
		return fn;
	}
}

module.exports = CopyTask.process;
