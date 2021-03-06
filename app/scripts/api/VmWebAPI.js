'use strict';

/**
 * @ngdoc function
 * @name vmBlocks3App.controller:VmWebAPI
 * @description
 * # VmWebAPI
 * Controller of the VmWebAPIModule
 */

(function () {

  var VmWebAPI = function ($http) {

 //   var VmesaURL = "http://demo1.svmesa.com/vmwebapi/Odata/MesaBlocks";
 //   var BlockDetailUrl = "http://demo1.svmesa.com/vmwebapi/odata/VmMesaBlockProperties?$filter=BlockName eq ";
 //   var BlockOutPutUrl = "http://demo1.svmesa.com/vmwebapi/Odata/VmBlockData?$filter=";
    
    

    var VmesaURL = "http://localhost:9001/Odata/MesaBlocks";
    var BlockDetailUrl = "http://localhost:9001/odata/VmMesaBlockProperties?$filter=BlockName eq ";
    var BlockOutPutUrl = "http://localhost:9001/Odata/VmBlockData?$filter=";
    
    
    
    //   http://demo1.svmesa.com/vmwebapi/odata/VmMesaBlockProperties?$filter=BlockName eq '600-150-LD' 

    // http://localhost:9001/Odata/VmBlockData?$filter=BlockName eq 'ST-100%20HP' and PropertyIndex eq 1 and Solution eq 1

    var getBlocks = function () {

      return $http.get(VmesaURL)
        .then(function (response) {
          //  console.log(response.data.value);
          return response.data.value;
        });
    };


    var getBlockProperty = function (sBlockName, iPropertyIndex, iSolutuionIndex) {
      var BlockNameArgUrl = 'BlockName eq ' + '\'' + sBlockName + '\'';
      var PropertyIndexUrl = ' and PropertyIndex eq ' + iPropertyIndex;
      var SolutionUrl = ' and Solution eq ' + iSolutuionIndex;
      var DetailUrl = BlockOutPutUrl + BlockNameArgUrl + PropertyIndexUrl + SolutionUrl
      //  console.log(DetailUrl);

      return $http.get(DetailUrl)
        .then(function (response) {
          var mbReturn = response.data.value[0];
          //       console.log(mbReturn);
          return mbReturn;
        });
    };

    var getBlockNameFromGuidAndAct = function (scope) {
      //fixme need to add this feature to the VmWebApi
      return $http.get(VmesaURL) //find correct URL
        .then(function (response) {
          //  var sBlockName = "Waste Heat LP Steam" //FIXME
          if (scope.componentType == 103) {
            scope.sBlockName = "alky";
          }
          else scope.sBlockName = "Waste Heat LP Steam" //FIXME
          return scope
        });
    }


    var blockName = "BOILER-1-FO";
    var PropertyIndex = 7;
    var newValue = 112;
    var vmWriteToBlock = function () {
      $http(
        {
          method: 'PATCH',
          url: "http://localhost:9001/OData/VmBlockData('')",
          data:
          {
            "BlockName": blockName, "PropertyIndex": PropertyIndex, "StringValue": newValue
          }
        });
    }

    return {
      getBlockNameFromGuidAndAct: getBlockNameFromGuidAndAct,
      getBlocks: getBlocks,
      getBlockProperty: getBlockProperty,
      vmWriteToBlock: vmWriteToBlock
    };
  };

  var module = angular.module("vmBlocks3App"); module.factory("VmWebAPI", VmWebAPI);
} ());