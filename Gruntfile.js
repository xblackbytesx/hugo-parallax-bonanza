module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        testPath: 'test',
        tmpPath: '.tmp',
        appRoot: '.',
        staticRoot: '<%= config.appRoot %>/static',
        sassPath: '<%= config.staticRoot %>/scss',
        cssPath: '<%= config.staticRoot %>/css',
        jsPath: '<%= config.staticRoot %>/js',
        imgPath: '<%= config.staticRoot %>/img',
        videoPath: '<%= config.staticRoot %>/video',
        vendorPath: '<%= config.staticRoot %>/vendor',
        distPath: '<%= config.staticRoot %>/dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        config: config,

        csscomb: {
            default: {
                options: {
                    config: 'csscomb.json'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.staticRoot %>/<%= config.sassPath %>/',
                    src: ['**/*.scss'],
                    dest: '<%= config.staticRoot %>/<%= config.sassPath %>/',
                    ext: '.scss'
                }]
            }
        },

        sass: {
            dist: {
                files: {
                    '<%= config.cssPath %>/main.css' : '<%= config.sassPath %>/main.scss'
                }
            }
        },

        concat: {
            css: {
                src: [
                    '<%= config.cssPath %>/*'
                ],
                dest: '<%= config.tmpPath %>/css/main.css'
            },
            js: {
                options: {
                    separator: ';\n',
                },
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/jquery-parallax.js/parallax.js',
                    '<%= config.jsPath %>/bootstrap.js',
                    '<%= config.jsPath %>/cbpAnimatedHeader.js',
                    '<%= config.jsPath %>/classie.js',
                    '<%= config.jsPath %>/jquery.easing.min.js',
                    '<%= config.jsPath %>/jquery.fittext.js',
                    '<%= config.jsPath %>/wow.min.js',
                    '<%= config.jsPath %>/main.js'
                ],
                dest: '<%= config.tmpPath %>/js/main.js'
            }
        },

        cssmin: {
            css: {
                src: '<%= config.tmpPath %>/css/main.css',
                dest: '<%= config.distPath %>/css/main.css'
            }
        },

        // htmlmin: {
        //     dist: {
        //         options: {
        //             removeComments: true,
        //             collapseWhitespace: true
        //         },
        //         files: {
        //             'dist/index.html': 'src/index.html',
        //             'dist/404.html': 'src/404.html'
        //         }
        //     }
        // },

        //compressing images
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.imgPath %>',
                    src: ['**/*.{png,jpg,gif,webp,svg}'],
                    dest: '<%= config.distPath %>/img'
                }]
            }
        },

        uglify: {
            js: {
                files: {
                    '<%= config.distPath %>/js/main.js': ['<%= config.tmpPath %>/js/main.js']
                }
            }
        },

        // Combine all media queries
        cmq: {
            options: {
                log: false
            },
            target: {
                files: {
                    '<%= config.cssPath %>/main.css': ['<%= config.cssPath %>/main.css']
                }
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['csscomb', 'sass', 'cmq', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js']
            }
        },

        clean: {
            folder: ['<%= config.tmpPath %>']
        }
    });

    grunt.registerTask('default', [
        'csscomb',
        'sass',
        'cmq',
        'concat:css',
        'cssmin:css',
        'concat:js',
        'imagemin',
        'uglify:js',
        'clean'
    ]);
}
