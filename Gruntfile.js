module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options : {
                //beautify : true
            },

            build: {
                src: 'src/js/jquery.zoomingbox.js',
                dest: 'dist/js/jquery.zoomingbox.min.js'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },
        jshint: {
            all: {
                src: 'src/js/jquery.zoomingbox.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('default', ['jshint','uglify', 'cssmin']);

};
