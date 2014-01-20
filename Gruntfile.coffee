module.exports = (grunt) ->
  # module loading
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-connect"
  
  # configure
  grunt.initConfig
    coffee:
      compile:
        options:
          bare:true
          livereload:true
        files:
          "build/app.js":"src/app.coffee"
          "build/public/javascripts/client.js":[
            "src/public/javascripts/control.coffee"
            "src/public/javascripts/init.coffee"
          ]
          "build/routes/index.js":"src/routes/index.coffee"
          "build/routes/control.js":"src/routes/control.coffee"
    watch:
      files: [
        "src/app.coffee"
        "src/public/javascripts/*.coffee"
        "src/routes/.coffee"
      ]
      tasks: [
        "coffee"
      ]
      options:
        livereload:true
    connect:
      livereload:
        options:
          port:9001
  # resigster
  grunt.registerTask "default", [
    "connect"
    "watch"
  ]