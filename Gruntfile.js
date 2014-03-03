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
    watch: {
      src: {
        files: ['src/jade/*.jade', 'src/stylus/*.styl'],
        tasks: ['default']
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  return grunt.registerTask("default", ['uglify', 'jade', 'stylus', 'watch']);
};
