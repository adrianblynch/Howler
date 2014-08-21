module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    devPath: '',
    distPath: '../static/',

    concat: {
      options: {
        separator: ''
      },
      main: {
        src: ['js/main.js'],
        dest: '<%= distPath %>js/main.js'
      },
      slideshow: {
        src: ['js/slideshow.js'],
        dest: '<%= distPath %>js/slideshow.js'
      },
      mapify: {
        src: ['js/mapify.js'],
        dest: '<%= distPath %>js/mapify.js'
      },
      ajaxloader: {
        src: ['js/ajaxloader.js'],
        dest: '<%= distPath %>js/ajaxloader.js'
      },
      lazyload: {
        src: ['js/lazyload.js'],
        dest: '<%= distPath %>js/lazyload.js'
      },
      activify: {
        src: ['js/activify.js'],
        dest: '<%= distPath %>js/activify.js'
      },
      init: {
        src: ['js/init.js'],
        dest: '<%= distPath %>js/init.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'js/main.min.js': ['<%= concat.lazyload.dest %>']
        }
      }
    },

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
    bake: {
      files: {
        "templates/dev/index.html": "templates/prod/index.html",
        "templates/dev/about.html": "templates/prod/about.html"
      }
    },
    watch: {
      css: {
          files: ['style/*.scss'],
          tasks: ['sass']
      },
      html: {
          files: ['templates/dev/index.html'],
          tasks: ['bake']
      },
      js: {
          files: ['js/*.js'],
          tasks: ['jshint', 'concat']
      }
    }
    /*,

    reload: {
        port: 8888,
        proxy: {
            host: 'localhost',
        }
    }*/

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-bake');
  //grunt.loadNpmTasks('grunt-reload');
  
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'bake']);
  

};