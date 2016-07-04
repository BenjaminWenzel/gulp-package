"use strict";

const config = require( "./gulp.config" );

const gulpPackage = require( "../src/gulp-package" );

/** ----- ----- ----- ----- -----
 * Cleaning
 */
const cleanCss       = gulpPackage.tasks.clean( "Cleaning CSS", [ `${config.destinations.css}/**/*.css`, `${config.destinations.css}/**/*.map` ] );
const cleanJs        = gulpPackage.tasks.clean( "Cleaning JS", [ `${config.destinations.css}/**/*.js`, `${config.destinations.css}/**/*.map` ] );
const cleanHtml      = gulpPackage.tasks.clean( "Cleaning html", `${config.destinations.html}/**/*.html` );
const cleanImages    = gulpPackage.tasks.clean( "Cleaning images", `${config.destinations.images}/**/*.*` );
const cleanFonts     = gulpPackage.tasks.clean( "Cleaning fonts", `${config.destinations.fonts}/**/*.*` );
const clean          = gulpPackage.parallel( cleanCss, cleanJs, cleanHtml, cleanFonts, cleanImages );
/** ----- ----- ----- ----- -----
 * CSS
 */
const buildMainCss   = gulpPackage.tasks.scss( "Creating Main CSS",
	config.sources.mainCss,
	"main",
	config.destinations.css,
	{
		autoprefix : true,
		minify     : true
	} );
const buildVendorCss = gulpPackage.tasks.css( "Creating Vendor CSS",
	config.sources.vendorCss,
	"vendor",
	config.destinations.css,
	{
		minify     : true,
		autoprefix : true
	} );
const buildCss       = gulpPackage.parallel( buildMainCss, buildVendorCss );
gulpPackage.task( "build:css", gulpPackage.series( cleanCss, buildCss ) );
/** ----- ----- ----- ----- -----
 * JS
 */
const buildMainJs   = gulpPackage.tasks.browserify( "Creating Main JS",
	config.sources.mainJs,
	"main",
	config.destinations.js );
const buildVendorJs = gulpPackage.tasks.js( "Merging vendor js",
	config.sources.vendorJs,
	"vendor",
	config.destinations.js,
	{
		minify : true
	} );
const buildJs       = gulpPackage.parallel( buildMainJs, buildVendorJs );
gulpPackage.task( "build:js", gulpPackage.series( cleanJs, buildJs ) );
/** ----- ----- ----- ----- -----
 * HTML
 */
const buildPug = gulpPackage.tasks.pug( "Creating Templates",
	config.sources.pug,
	config.destinations.html,
	{
		pretty : true
	} );
gulpPackage.task( "build:templates", gulpPackage.series( cleanHtml, buildPug ) );
/** ----- ----- ----- ----- -----
 * Images
 */
const copyImages = gulpPackage.tasks.copy( "Copying Images", config.sources.images, config.destinations.images );
gulpPackage.task( "copy:images", gulpPackage.series( cleanImages, copyImages ) );
/** ----- ----- ----- ----- -----
 * Fonts
 */
const copyFonts = gulpPackage.tasks.copy( "Copying Fonts", config.sources.fonts, config.destinations.fonts );
gulpPackage.task( "copy:fonts", gulpPackage.series( cleanFonts, copyFonts ) );
/** ----- ----- ----- ----- -----
 * Build
 */
const build = gulpPackage.series( clean, gulpPackage.parallel( buildCss, buildJs, buildPug, copyFonts, copyImages ) );
gulpPackage.task( "default", build );
/** ----- ----- ----- ----- -----
 * Watcher
 */
const watchCss    = gulpPackage.watch( "watch:css", "Watching CSS Files", config.sources.mainCss, buildMainCss );
const watchJs     = gulpPackage.watch( "watch:js", "Watching JS Files", config.sources.mainJs, buildMainJs );
const watchPug    = gulpPackage.watch( "watch:pug", "Watching PUG Files", config.sources.pug, buildPug );
const watchImages = gulpPackage.watch( "watch:images", "Watching Images", config.sources.images, copyImages );
const watchConfig = gulpPackage.watch( "watch:config", "Watching Configuration", "./gulp.config.js", build );
const watch       = gulpPackage.parallel( watchConfig, watchCss, watchJs, watchPug, watchImages );
gulpPackage.task( "watch", watch );
/** ----- ----- ----- ----- -----
 * Local server
 */
const localServer = gulpPackage.tasks.webserver( "Local Server", config.destinations.html );
gulpPackage.task( "serve", gulpPackage.series( build, localServer, watch ) );
