module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    devPath: '',
    distPath: '../static/',

    jshint: {
      files: ['Gruntfile.js', 'js/main.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'style/main.css': 'style/main.scss',
          '<%= distPath %>css/main.css': 'style/main.scss'
        }
      }
    },
    watch: {
      css: {
          files: ['style/*.scss'],
          tasks: ['sass']
      },
      js: {
          files: ['js/*.js'],
          tasks: ['jshint', 'requirejs']
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "js",
          out: "<%= distPath %>js/main.js",
          name: "main",
          mainConfigFile : "js/config.js"
        }
      }
    },
    grunticon: {
      myIcons: {
        files: [{
            expand: true,
            cwd: 'img/icons',
            src: ['*.svg', '*.png'],
            dest: '<%= distPath %>img/icons/'
        }],
        options: {
          
          colors: {
              darkGray: "#aaaaaa",
              lightGray: "#cccccc",
              white: "#ffffff",
              black: "#000000"
          },
          customselectors: {
              "check-white": [".btn-save"],
              "plus-white": [".btn-add"],
              "edit-white": [".btn-edit"]
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-grunticon');
  
  grunt.registerTask('default', ['jshint', 'sass', 'requirejs']);
  

};