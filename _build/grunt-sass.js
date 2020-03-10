module.exports = function(grunt) {
	const sass = require('node-sass');

	grunt.loadNpmTasks( "grunt-sass" );

	grunt.config( "sass", {
		options: {
			implementation: sass,
			sourceMap: true
		},
		dist: {
			files: {
				'_site/_assets/css/all.css' : ['_src/_assets/css/all.scss']
			}
		}
	});
};