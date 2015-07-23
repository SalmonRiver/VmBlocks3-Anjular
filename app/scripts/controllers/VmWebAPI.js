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

    var VmesaURL = "http://demo1.svmesa.com/vmwebapi/Odata/MesaBlocks";
    var BlockDetailUrl = "http://demo1.svmesa.com/vmwebapi/odata/VmMesaBlockProperties?$filter=BlockName eq "  

    var getBlocks = function () {

      return $http.get(VmesaURL)
        .then(function (response) {
          console.log(response.data.value);
          return response.data.value;
        });
    };
    
     var getBlockDetails = function (sBlockName) {

      return $http.get(BlockDetailUrl + '\'' + sBlockName +  '\'')
        .then(function (response) {
          console.log (BlockDetailUrl + '\'' + sBlockName +  '\'')
          console.log(response.data.value);
          return response.data.value;
        });
    };
    
    
    return {
      getBlocks: getBlocks,
      getBlockDetails: getBlockDetails
    };
  };

  var module = angular.module("vmBlocks3App"); module.factory("VmWebAPI", VmWebAPI);
} ());