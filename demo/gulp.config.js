"use strict";

const dir = {
	source      : "src",
	bower       : "src/lib",
	destination : "dist"
};

module.exports = {
	destinations : {
		css    : `${dir.destination}/css`,
		js     : `${dir.destination}/js`,
		images : `${dir.destination}/images`,
		fonts  : `${dir.destination}/fonts`,
		html   : dir.destination
	},
	sources      : {
		mainCss   : [
			`${dir.source}/scss/**/*.scss`
		],
		vendorCss : [
			`${dir.bower}/bootstrap/dist/css/bootstrap.css`,
			`${dir.bower}/animate.css/animate.css`,
			`${dir.bower}/font-awesome/css/font-awesome.css`
		],
		mainJs    : `${dir.source}/js/main.js`,
		vendorJs  : [
			`${dir.bower}/jquery/dist/jquery.min.js`,
			`${dir.bower}/bootstrap/dist/js/bootstrap.js`,
			`${dir.bower}/parallax.js/parallax.min.js`,
			`${dir.bower}/waypoints/lib/jquery.waypoints.js`
		],
		pug       : [
			`${dir.source}/pug/*.pug`
		],
		images    : [
			`${dir.source}/images/**`
		],
		fonts     : [
			`${dir.source}/fonts/**`
		]
	}
};
