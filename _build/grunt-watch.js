module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-watch" );

	grunt.config( "watch", {
		css: {
			files: ['_src/_assets/css/*'],
			tasks: 'watch-css'
		},
		js: {
			files: ['_src/_assets/js/*'],
			tasks: 'watch-js'
		}
	});
};