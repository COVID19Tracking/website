/*global module:false,require:false*/

module.exports = function(grunt) {
	'use strict';

	// Initial project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		banner: '/*! v<%= pkg.version %> - */'
	});

	grunt.loadTasks( "_build" );

	// Default task.
	grunt.registerTask('default', [
		'sass',
		'uglify'
	]);

	grunt.registerTask('watch-css', [
		'sass'
	]);

	grunt.registerTask('watch-js', [
		'uglify'
	]);
};