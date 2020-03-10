module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-clean" );

	grunt.config( "clean", ['_site']);
};