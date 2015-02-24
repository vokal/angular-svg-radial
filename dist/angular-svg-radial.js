/*!
 * angular-svg-radial 0.1.0
 * (c) 2015 Vokal LLC
 * https://github.com/vokal/angular-svg-radial
 */
angular.module("svgRadial", []).directive("radialProgress", function() {
    "use strict";
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        template: '<div class="radial-progress">' + '<div class="base"></div>' + '<div class="radial">' + '<div class="piece"></div>' + '<div class="piece"></div>' + "</div>" + '<div class="transclude" ng-transclude></div>' + "</div>",
        link: function(scope, element, attrs) {
            var setRotation = function(selector, numVal) {
                var cssObj = {
                    "-ms-transform": "rotate( " + numVal + "deg )",
                    "-webkit-transform": "rotate( " + numVal + "deg )",
                    "-moz-transform": "rotate( " + numVal + "deg )",
                    transform: "rotate( " + numVal + "deg )"
                };
                element.find(selector).css(cssObj);
            };
            var setStyle = function(percent) {
                var angle1, angle2;
                angle1 = angle2 = 360 * percent / 100;
                angle1 = Math.min(180, angle1);
                angle2 = Math.min(360, angle2);
                setRotation(".piece:first-child", angle1);
                setRotation(".piece:last-child", angle2);
                element.find(".radial").toggleClass("gtFifty", percent > 50);
            };
            setStyle(attrs.percent);
            attrs.$observe("percent", setStyle);
        }
    };
});