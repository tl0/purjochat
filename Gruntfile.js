module.exports = function(grunt) {
  grunt.initConfig({
	jade: {
      compile: {
        files: {
          "public/index.html": "src/jade/index.jade"
        }
      }
    },
    stylus: {
      compile: {
        files: {
          "public/css/styles.css": "src/stylus/*.styl"
        },
        options: {
          compress: true
        }
      }
    },
    uglify: {
      uglifier: {
        expand: true,
        cwd: 'public/js/full',
        src: ['*.js'],
        dest: 'public/js',
        ext: '.min.js'
      }
    },
    copy: {
      lib: {
        files: [
          {
            expand: true,
            cwd: "src/lib",
            src: ["*.js"],
            dest: "public/js/"
          }
        ]
      }
    },
    express: {
      express: {
        options: {
          script: 'app.js'
        }
      }
    },
    watch: {
      src: {
        files: ['src/jade/*.jade', 'src/stylus/*.styl', 'src/lib/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  return grunt.registerTask("default", ['uglify', 'jade', 'stylus', 'copy', 'express', 'watch']);
};
