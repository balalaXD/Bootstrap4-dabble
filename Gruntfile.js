'use strict'

module.exports = function (grunt) {
  require('time-grunt')(grunt)
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  })

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },

    browserSync: {
      bsFiles: {
        src: [
          'css/*.css',
          'js/*.js',
          '*.html',
          'img/*.{png,jpg,gif}'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: './'
        }
      }
    },
    watch: {
      scripts: {
        files: ['css/*.scss'],
        tasks: ['sass']
      }
    },

    clean: {
      build: {
        src: ['dist/']
      }
    },
    copy: {
      html: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: './',
            src: ['*.html'],
            dest: 'dist/'
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'node_modules/font-awesome',
            src: ['fonts/*.*'],
            dest: 'dist/'
          }
        ]
      }
    },

    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: './',
            src: ['img/*.{png,jpg,gif}'],
            dest: 'dist/'
          }
        ]
      }
    },

    useminPrepare: {
      foo: {
        dest: 'dist',
        src: ['index.html']
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function (context, block) {
                var generated = context.options.generated
                generated.options = {
                  level: { 1: { specialComments: 0 } },
                  rebase: false
                }
              }
            }]
          }
        }
      }
    },

    // Uglify
    uglify: {
    },

    cssmin: {
    },

    // Filerev
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },

      release: {
      // filerev:release hashes(md5) all assets (images, js and css )
      // in dist directory
        files: [
          {
            src: [
              'dist/js/*.js',
              'dist/css/*.css'
            ]
          }
        ]
      }
    },

    // Usemin
    // Replaces all assets with their re-versioned version in html files.
    // options.assetDirs contains the directories for finding the assets
    // according to their relative paths
    usemin: {
      html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
      options: {
        assetsDirs: ['dist']
      }
    },

    htmlmin: { // Task
      dist: { // Target
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: { // Dictionary of files
          'dist/index.html': 'dist/index.html', // 'destination': 'source'
          'dist/contactus.html': 'dist/contactus.html',
          'dist/aboutus.html': 'dist/aboutus.html'
        }
      }
    }
  })

  grunt.registerTask('css', ['sass'])
  grunt.registerTask('default', ['browserSync', 'watch'])
  grunt.registerTask('build', [
    'clean',
    'copy',
    'imagemin',
    'useminPrepare',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ])
}
