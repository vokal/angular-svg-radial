/**
 * @license angular-svg-radial v0.2.0
 * (c) 2015 Vokal LLC https://github.com/vokal/angular-svg-radial
 * License: MIT
 */
angular.module( "svgRadial", [] )
    .directive( "asrWrap", [ function ()
    {
        "use strict";
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            templateUrl: "templates/asrRadial.html",
            scope: {
                percent: "="
            },
            controller: function ()
            {
                this.strokes = [];
                this.largerStroke = function ()
                {
                    var largest;
                    this.strokes.forEach( function ( s )
                    {
                        var int = Number( s.slice( 0, s.indexOf( "px" ) ) );
                        if ( !largest || int > largest )
                        {
                            largest = int;
                        }
                    } );
                    return largest;
                };
            },
            link: function ( scope, elem, attrs, ctrl )
            {
                var width = elem[ 0 ].offsetWidth;
                scope.$watch( function ()
                {
                    return elem[ 0 ].offsetWidth;
                }, function ( newWidth )
                {
                    width = newWidth;
                } );

                scope.style = function ()
                {
                    return {
                        "height": width + "px"
                    };
                };
                scope.c = function ()
                {
                    return Math.floor( width / 2 );
                };
                scope.r = function ()
                {
                    return minZero( scope.c() - Math.ceil( ctrl.largerStroke() / 2 ) );
                };
                
                function minZero( v )
                {
                    return v >= 0 ? v : 0;   
                }
            }
        };
    } ] )

    .directive( "asrCircle", [ "$window", "$timeout", function ( $window, $timeout )
    {
        "use strict";
        return {
            restrict: "E",
            templateNamespace: "svg",
            replace: true,
            require: "^asrWrap",
            templateUrl: "templates/asrCircle.html",
            scope: {
                c: "=",
                r: "=rad",
                p: "="
            },
            link: function ( scope, elem, attrs, ctrl )
            {
                ctrl.strokes.push( $window.getComputedStyle( elem[ 0 ] ).strokeWidth );
                scope.circ = function ()
                {
                    return 2 * scope.r * Math.PI;
                };
                scope.offset = function ()
                {
                    return !scope.p || scope.fin() ? 0 :
                        scope.circ() - ( scope.p / 100 * scope.circ() );
                };
                scope.fin = function ()
                {
                    return scope.p && scope.p >= 100;
                };

                $timeout( function()
                {
                    elem.addClass( "ready" );
                }, 100 );
            }
        };
    } ] );
