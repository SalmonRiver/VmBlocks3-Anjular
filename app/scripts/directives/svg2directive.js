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
        templateUrl: 'svg/simple.svg',
        link: function (scope, element, attrs) {
            var shapes = element[0].querySelectorAll('g')

            angular.forEach(shapes, function (path, key) {
                var shapeElement = angular.element(path);
                shapeElement.attr("shape", "");
             //   console.log(shapeElement);
                $compile(shapeElement)(scope);

            })
        }
    }
}]);

angular.module('vmBlocks3App').directive('shape', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.elementtransform = element.attr("transform");
            scope.regionClick = function () {
                if (scope.elementId != null) {
                    
                    
                    alert("Hello world,  My transform is: " + scope.elementtransform);
                    console.log(element[0].getElementsByTagName("v:ud"))
                 //   var map = element[0].querySelectorAll('NamedNodeMap').getNamedItem('v:custprops');
                 //   console.log (scope.userDefs);
                }
            };
            element.attr("ng-click", "regionClick()");

            element.removeAttr("shape");
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