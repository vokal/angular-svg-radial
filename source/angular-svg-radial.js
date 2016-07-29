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
                rotation: "&",
                values: "="
            },
            controller: function ()
            {
                var ctrl = this;

                ctrl.strokes = [];
                ctrl.largestStroke = 0;

                ctrl.addStroke = function ( val )
                {
                    ctrl.strokes.push( val );
                    if( val > ctrl.largestStroke )
                    {
                        ctrl.largestStroke = val;
                    }
                };
            },
            link: function ( scope, elem, attrs, ctrl )
            {
                if( !scope.values )
                {
                    return false;
                }

                var width = elem[ 0 ].offsetWidth;
                scope.asr = {
                    center: Math.floor( width / 2 ),
                    fin: function ()
                    {
                        return scope.values.reduce( function ( prev, curr )
                        {
                            return prev + curr;
                        }, 0 ) >= 100;
                    },
                    radius: function ()
                    {
                        return Math.max( scope.asr.center - Math.ceil( ctrl.largestStroke / 2 ), 0 );
                    },
                    style: { height: width + "px" }
                };

                scope.$watch( function ()
                {
                    return elem[ 0 ].offsetWidth;
                }, function ( newWidth )
                {
                    width = newWidth;
                    scope.asr.center = Math.floor( width / 2 );
                    scope.asr.style.height = width + "px";
                } );

                var cumulative = 0;
                scope.asr.values = scope.values.map( function ( val )
                {
                    var radial = {
                        percent: cumulative + val <= 100 ? val : 100 - cumulative,
                        offset: cumulative
                    };
                    cumulative += radial.percent;
                    return radial;
                } );
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
                rotation: "=",
                percent: "=",
                offset: "="
            },
            link: function ( scope, elem, attrs, ctrl )
            {
                var strokeWidth = $window.getComputedStyle( elem[ 0 ] ).strokeWidth;
                ctrl.addStroke(
                    Number( strokeWidth.slice( 0, strokeWidth.indexOf( "px" ) ) )
                );

                scope.diam = function ()
                {
                    return 2 * scope.r * Math.PI;
                };
                scope.transformOffset = function ()
                {
                    return scope.offset * 3.6 + ( scope.rotation || 0 );
                };
                scope.strokeOffset = function ()
                {
                    return scope.percent >= 100 ? 0 : scope.diam() - ( scope.percent / 100 * scope.diam() );
                };

                $timeout( function()
                {
                    elem.addClass( "ready" );
                }, 100 );
            }
        };
    } ] );
