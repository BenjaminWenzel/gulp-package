"use strict";

const gulp  = require( "gulp" );
const gutil = require( "gulp-util" );

class GulpPackage {

	/**
	 *@constructor
	 */
	constructor() {
		this.tasks    = require( "./tasks" );
		this.task     = gulp.task;
		this.series   = gulp.series;
		this.parallel = gulp.parallel;
	}

	watch( name, desc, source, cb ) {
		const fn       = ()=> {
			gulp.watch( source, cb )
				.on( "change", file => {
					gutil.log( "File changed", gutil.colors.green( file ) );
				} );
		};
		fn.displayName = desc;
		gulp.task( name, fn );
		return fn;
	}
}

module.exports = new GulpPackage();
