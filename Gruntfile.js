'use strict'

module.exports = function (grunt) {
  require('time-grunt')(grunt)
  require('jit-grunt')(grunt)

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: ['css/*.scss'],
        tasks: ['sass']
      }
    },
    browserSync: {
      bsFiles: {
        src: [
          'css/*.css',
          'js/*.js',
          '*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: './'
        }
      }
    }
  })

  grunt.registerTask('css', ['sass'])
  grunt.registerTask('default', ['browserSync', 'watch'])
}
