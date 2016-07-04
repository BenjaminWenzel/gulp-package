"use strict";

const _      = require( "lodash" );
const fs     = require( "fs" );
const mkdirp = require( "mkdirp" );
const path   = require( "path" );

class TaskHHelper {
	/**
	 * Checks if the destination exists and creates it if not
	 */
	static checkDestination( destination ) {
		if( !_.isUndefined( destination ) ) {
			const absPath = path.resolve( `${process.cwd()}/${destination}` );
			try {
				const stats = fs.lstatSync( absPath );
				if( !stats.isDirectory() ) {
					mkdirp( absPath );
				}
			} catch( e ) {
				// Todo: Check if error occurred because directory doesn't exist or creation failed
				const stop = true;
				mkdirp( absPath );
			}
		}
	}

	static resolveSource( source ) {
		if( !_.isArray( source ) ) {
			source = [ source ];
		}
		return source;
	}
}

module.exports = TaskHHelper;
