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
    var BlockDetailUrl = "http://demo1.svmesa.com/vmwebapi/odata/VmMesaBlockProperties?$filter=BlockName eq "  ;
    
    var BlockOutPutUrl =  "http://demo1.svmesa.com/vmwebapi/Odata/VmBlockData?$filter=";
    
    

// http://localhost:9001/Odata/VmBlockData?$filter=BlockName eq 'ST-100%20HP' and PropertyIndex eq 1 and Solution eq 1

    var getBlocks = function () {

      return $http.get(VmesaURL)
        .then(function (response) {
          console.log(response.data.value);
          return response.data.value;
        });
    };
    
     var getBlockDetails = function (sBlockName , iPropertyIndex, iSolutuionIndex) {
       var BlockNameArgUrl = 'BlockName eq ' + '\'' + sBlockName + '\''; 
       var PropertyIndexUrl =  ' and PropertyIndex eq ' +  iPropertyIndex ; 
       var SolutionUrl =  ' and Solution eq ' +  iSolutuionIndex ;   
       var DetailUrl = BlockOutPutUrl +  BlockNameArgUrl+    PropertyIndexUrl +  SolutionUrl
       console.log (DetailUrl);

      return $http.get(DetailUrl)
        .then(function (response) {
      //    console.log (BlockDetailUrl + '\'' + sBlockName +  '\'')
      //    console.log(response.data.value);
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