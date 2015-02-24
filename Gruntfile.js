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
                src: [ "svg-radial.js", "Gruntfile.js" ]
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
                sourceMap: false
            },
            min:
            {   
                options:
                {
                    mangle: true,
                    compress: true
                },
                files: { "dist/<%= pkg.name %>.min.js": [ "svg-radial.js" ] }
            },
            copy:
            {   options:
                {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: { "dist/<%= pkg.name %>.js": [ "svg-radial.js" ] }
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
