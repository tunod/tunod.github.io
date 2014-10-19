'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        recess: {
            dist: {
                options: {
                    compile: true,
                    compress: true
                },
                files: {
                    'css/app.min.css': [
                        'vendor/css/bootstrap.css',
                        'vendor/css/font-awesome.css',
                        'css/sprites.css',
                        'less/app.less',
                        'less/galleries.less',
                        'vendor/css/helpers.css',
                    ]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'Gruntfile.js',
                'js/*.js'
            ]
        },
        jsbeautifier: {
            jsFiles: ['Gruntfile.js', 'js/*.js']
        },
        uglify: {
            dist: {
                files: {
                    'js/app.min.js': [
                        'vendor/js/jquery.js',
                        'vendor/js/bootstrap.min.js',
                        'vendor/js/happycookies.js',
                        'vendor/js/jquery.cycle2.min.js',
                        'vendor/js/jquery.bgsize.js',
                        'js/app.js'
                    ],
                    'vendor/js/compat.min.js': [
                        'vendor/js/modernizr.min.js',
                        'vendor/js/css3-mediaqueries.js',
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: [
                    'less/*.less',
                    'css/*.css',
                    '!css/app.min.css'
                ],
                tasks: ['recess']
            },
            js: {
                files: [
                    'js/*.js',
                    '!js/app.min.js'
                ],
                tasks: ['jsbeautifier:jsFiles', 'uglify']
            }
        },
        clean: {
            dist: [
                'css/app.min.css',
                'js/app.min.js',
                'vendor/js/compat.min.js'
            ]
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'recess',
        'jsbeautifier:jsFiles',
        'uglify'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};
