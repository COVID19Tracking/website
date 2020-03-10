module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-uglify-es" );

	grunt.config( "uglify", {
		sw: {
			files: {
				'_site/sw.js': ['_site/sw.js']
			}
		}
	});
};