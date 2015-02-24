module.exports = function( grunt )
{
    "use strict";

    grunt.initConfig( {

        pkg: grunt.file.readJSON( "package.json" ),
        
        jshint:
        {
            options:
            {
                force: true,
                jshintrc: ".jshintrc",
                report: "jslint"
            },
            all:
            {
                src: [ "source/*.js", "Gruntfile.js" ]
            }
        },

        karma:
        {
            unit: { configFile: "tests/karma.conf.js" }
        },

        less:
        {
            all:
            {
                files: { "dist/svg-radial.css": "less/svg-radial.less" }
            }
        },

        uglify:
        {
            options: {
                banner: "/*!\n"
                      + " * <%= pkg.name %> <%= pkg.version %>\n"
                      + " * (c) <%= grunt.template.today( 'yyyy' ) %> Vokal LLC\n"
                      + " * <%= pkg.homepage %>\n"
                      + " */\n",
                sourceMap: false,
                mangle: true,
                compress: true 
            },
            min:
            {   
                files: { "dist/<%= pkg.name %>.min.js": [ "source/<%= pkg.name %>.js" ] }
            }
        },

        watch:
        {
            options: { atBegin: true },
            js:
            {
                files: "<%= jshint.all.src %>",
                tasks: [ "jshint" ]
            }
        }

    } );

    // Load plugins
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-less" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-karma" );
};
