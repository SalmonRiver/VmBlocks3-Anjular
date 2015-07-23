'use strict';

/**
 * @ngdoc function
 * @name vmBlocks3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vmBlocks3App
 */

angular.module('vmBlocks3App')
  .controller('MainCtrl', function ($scope, $http, $location) {
    // dummies values before we hook up to  a web service
   
    var VmesaURL = "http://demo1.svmesa.com/vmwebapi/Odata/MesaBlocks";

    $http.get(VmesaURL)
      .success(function (response) {
        // console.log (response);
        $scope.RawHtmlReturn = response;
        $scope.blocks = response.value
         console.log (response.value);
      });
      
      $scope.NavigateTo = function() {
        console.log("calling navigate " + $scope.selectedBlock);   
        
        $location.path("/MesaBlock");     // need to add the block to load the form on 
        
      }
      
     
  });
  
  
