module.exports = function(grunt) {
  var shell          = require ('shelljs');
  var bourbon_path   = shell.exec('bundle show neat', { async: false, silent: true }).stdout.replace("\n", '') + '/app/assets/stylesheets';
  var neat_path      = shell.exec('bundle show bourbon', { async: false, silent: true }).stdout.replace("\n", '') + '/app/assets/stylesheets';
  var normalize_path = shell.exec('bundle show normalize-scss', { async: false, silent: true }).stdout.replace('\n', '') + '/sass';

  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: './',
          port: '3000',
          host: '*',
          livereload: true
        }
      }
    },
    sass: {
      develop: {
        options: {
          style: 'expanded',
          loadPath: [bourbon_path, neat_path, normalize_path, 'assets/sass'],
          sourcemap: 'none',
          require: 'sass-globbing',
          noCache: true
        },
        files: {
          'assets/css/application.css':'assets/sass/application.scss'
        }
      },
      production: {
        options: {
          style: 'compressed',
          loadPath: [bourbon_path, neat_path, normalize_path, 'assets/sass'],
          sourcemap: 'none',
          require: 'sass-globbing',
          noCache: true
        },
        files: {
          'assets/css/application.css':'assets/sass/application.scss'
        }
      }
    },
    watch: {
      html: {
        files: '*.html',
        options: {
          spawn: false,
          livereload: true
        }
      },
      styles: {
        files: 'assets/sass/**/*.scss',
        tasks: ['sass:develop'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect', 'watch']);
}
