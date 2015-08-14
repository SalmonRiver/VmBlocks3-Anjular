'use strict';

/**
 * @ngdoc directive
 * @name vmBlocks3AnjularApp.directive:svg2Directive
 * @description
 * # svg2Directive
 */


angular.module('vmBlocks3App').directive('svg2Diagram', ['$compile', '$location', function ($compile, $location) {
    return {
        restrict: 'A',
        //  templateUrl: 'svg/simple.svg',
        templateUrl: function (elem, attrs) {
            // get the Plant to display name  from the URL;
            //FIXME
            // May need a name translator to find the file
            // need a method to put the files in the correct location   
            var url = $location.url();
            var sPlantNameUrl = url.replace("/svg/", "svg/") + ".svg";
            return sPlantNameUrl;
//TODO  need to inject width="100%" height="100%"  into the SVG before displaying so it will fit the screen 
        },
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



angular.module('vmBlocks3App').directive('shape', ['$compile', "$location", "VmWebAPI", function ($compile, $location, VmWebAPI) {

    var onGetBlockNameComplete = function (scope) {

        if (scope.componentType == 103) {
            // this is a process plant and needs to show a new page
           
            $location.path("/svg/" + scope.sBlockName);
        }
        else if (scope.componentType > 1 && scope.componentType < 100) {
            // this is a block and needs to show a dialog 
              
            $location.path("/MesaBlock/" + scope.sBlockName);
        }


    }

    var onGetBlockNameError = function (reason) {
        alert("onGetBlockName   " + reason);
    }

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

    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            scope.regionClick = function () {
                if (element.attr("id") != null) {

                    scope.componentType = getComponentType(element);
                    scope.sourceGuid = getSourceGUID(element)

                    if (scope.sourceGuid != null) {
                        VmWebAPI.getBlockNameFromGuidAndAct(scope)
                            .then(onGetBlockNameComplete, onGetBlockNameError)



                    }

                }
            };
            element.attr("ng-click", "regionClick()");

            element.removeAttr("shape");
            $compile(element)(scope);
        }
    }
}]);
