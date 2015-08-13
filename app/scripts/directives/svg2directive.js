'use strict';

/**
 * @ngdoc directive
 * @name vmBlocks3AnjularApp.directive:svg2Directive
 * @description
 * # svg2Directive
 */

var getSourceGUID = function (element) {
    var vUds = element[0].getElementsByTagName("v:ud");
    var i;
    for (i = 0; i < vUds.length; i++) {

        var nameU = vUds[i].getAttribute("v:nameu");
        if (nameU == "SourceGUID") {
            var SourceGUID = vUds[i].getAttribute("v:val");
            // parse out the exact guuid which is between the brackets {} 
            SourceGUID=SourceGUID.substring(SourceGUID.lastIndexOf("{")+1,SourceGUID.lastIndexOf("}"));
            return SourceGUID;
        }
    }
    return null;
}


angular.module('vmBlocks3App').directive('svg2Diagram', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'svg/simple.svg',
        link: function (scope, element, attrs) {
            var shapes = element[0].querySelectorAll('g')

            angular.forEach(shapes, function (path, key) {
                var shapeElement = angular.element(path);
                shapeElement.attr("shape", "");
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
            scope.regionClick = function () {
                if (element.attr("id") != null) {

                    scope.SourceGUID = getSourceGUID(element);
                    alert(scope.SourceGUID);

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