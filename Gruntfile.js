/**
 * Created by robert.chapman on 3/28/16.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            main: {
                files: {
                    'app/dist/js/render.min.js': ['node_modules/renderjson/renderjson.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};