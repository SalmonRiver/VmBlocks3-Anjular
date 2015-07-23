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
        }
    }
}]);