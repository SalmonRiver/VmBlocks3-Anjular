'use strict';

/**
 * @ngdoc directive
 * @name vmBlocks3AnjularApp.directive:svg2Directive
 * @description
 * # svg2Directive
 */

var getVisioAttribute = function (element, sRootNodeName, sVariableName, sVariableValueName) {
    var comp = element[0].getElementsByTagName(sRootNodeName);
    var sValueAtt = "v:val";
    var i;
    for (i = 0; i < comp.length; i++) {
        if (comp[i].hasAttribute(sVariableName)) {
            var compName = comp[i].getAttribute(sVariableName);
            if (compName == sVariableValueName) {
                if (comp[i].hasAttribute(sValueAtt)) {
                    var answer = comp[i].getAttribute(sValueAtt);
                    return answer;
                }
            }
        }
    }
    return null;
}

var getComponentType = function (element) {
    var sRawComponentType = getVisioAttribute(element, "v:cp", "v:nameu", "ComponentType")
    if (sRawComponentType != null) {
        // parse out the exact guuid which is between the parenthases () 
        var ComponentType = sRawComponentType.substring(sRawComponentType.lastIndexOf("(") + 1, sRawComponentType.lastIndexOf(")"));
        return ComponentType;
    }

}

var getSourceGUID = function (element) {
    var sRawSourceGUID = getVisioAttribute(element, "v:ud", "v:nameu", "SourceGUID")
    if (sRawSourceGUID != null) {
        // parse out the exact guuid which is between the brackets {} 
        var SourceGUID = sRawSourceGUID.substring(sRawSourceGUID.lastIndexOf("{") + 1, sRawSourceGUID.lastIndexOf("}"));
        return SourceGUID;
    }
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

var onGetBlockNameComplete = function(sBlockName, $location){
    console.log($location)
        
    $location.path("/MesaBlock/" + sBlockName);
}

var onGetBlockNameError = function(reason) {
    console.log(reason);
}

angular.module('vmBlocks3App').directive('shape', ['$compile', "$location", "VmWebAPI", function ($compile, $location, VmWebAPI) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            scope.regionClick = function () {
                if (element.attr("id") != null) {

                    scope.componentType = getComponentType(element);
                    scope.sourceGuid = getSourceGUID(element)
                    alert("Component Type = " + scope.componentType +  "     SourceGuid = " + scope.sourceGuid);
                    //fixme
                    
                    scope.blockname = "Waste Heat LP Steam";
                    
                    VmWebAPI.getBlockName(scope.sourceGuid, $location)
                    .then(onGetBlockNameComplete, onGetBlockNameError);
 
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