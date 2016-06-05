module.exports = function(grunt) {
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {                              // Task
            dist: {                            // Target
              options: {                       // Target options
                style: 'expanded'
              },
              files: [{                         // Dictionary of files
                'src/style/sass.css': 'src/style/sass/main.scss',       // 'destination': 'source'
              }]
            }
          },
        concat: {   
            js: {
                src: [
                    'src/js/*.js' //select all js files in js folder
                ],
                dest: 'src/js/build/main.js'
            },
            css: {
                src: [
                    'src/style/*.css' //select all css files in style folder
                ],
                dest :'src/style/build/main.css'
            }
        },
        uglify: {
            build: {
                src: 'src/js/build/main.js',
                dest: 'src/js/build/main.min.js',
            }
        },
        cssmin: {
              css:{
                src: 'src/style/build/main.css',
                dest: 'src/style/build/main.min.css', 
              }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'src/images/'
                }]
            }
           },

        watch: {
            options: {
                keepalive: true //make sure keepalive is a part of watch task not PHP task
            },
            livereload: {
              options: { livereload: true }, //important!!!
              files: ['src/**/*'],
            },
            scss: {
                files: ['src/style/sass/*.scss'],
                tasks: ['sass', 'concat:css', 'cssmin'],
                options: {
                    spawn: false,
                }
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },

            css: {
                files: ['src/style/*.css'],
                tasks: ['concat:css', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
            images: {
                files: ['pre-build/img/*'],
                tasks: ['newer:imagemin'],
                options: {
                    spawn:false,
                }
            },
        },
        php: {
            dist: {
                options: {
                    base: 'src',
                    livereload: true,
                    open: true,
                    port: 9000
                }
            }

        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('build', ['sass','concat','uglify','cssmin','newer:imagemin']);
    grunt.registerTask('serve', ['php','watch']);

};