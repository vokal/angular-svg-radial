module.exports = function ( config )
{
    config.set( {

        basePath: "../",
        frameworks: [ "jasmine" ],
        autoWatch: false,
        browsers: [ "PhantomJS" ],
        reporters: [ "dots" ],
        singleRun: true,
        plugins: [
            "karma-jasmine",
            "karma-phantomjs-launcher"
        ],

        files: [
            "bower/angular/angular.js",
            "bower/angular-mocks/angular-mocks.js",
            "bower/jquery/dist/jquery.js",

            "source/angular-svg-radial.js",

            "tests/*.spec.js"
        ]

    } );
    
};
