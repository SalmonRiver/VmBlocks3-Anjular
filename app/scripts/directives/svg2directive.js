'use strict';

/**
 * @ngdoc directive
 * @name vmBlocks3AnjularApp.directive:svg2Directive
 * @description
 * # svg2Directive
 */


angular.module('vmBlocks3App').directive('svg2Diagram', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'svg/alky.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.IAMVM');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("hover-region", "hoverRegion"); //<--- Add this
                $compile(regionElement)(scope);
            })
        }
    }
}]);


angular.module('vmBlocks3App').directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionClick = function () {
                
                console.log (scope);
                alert("Hello world");
                //  scope.stroke = "#000000";
                element.attr("ng-attr-fill", "{{2 | random_color}}");


            };
            scope.regionMouseOver = function () {               //<
                scope.hoverRegion = scope.elementId;            //<--- Add this
                element[0].parentNode.appendChild(element[0]);  //<
            };
            element.attr("ng-click", "regionClick()");
            //  element.attr("ng-attr-fill", "{{0 | random_color}}"); //<--- THIS BIT!
            element.removeAttr("region");   
            element.attr("ng-mouseover", "regionMouseOver()"); //<--- Add this
            element.attr("ng-class", "{active:hoverRegion==elementId}"); //<--- Add this
            $compile(element)(scope);
        }
    }
}]);

angular.module('vmBlocks3App').filter('random_color', [function () {
    return function (input) {
        var rand = Math.random();
        input = rand;
        var b = 255 - Math.floor(input * 255);
        var g = Math.floor(input * 255);
        return "rgba(255," + g + "," + b + ",1)";
    }
}]);