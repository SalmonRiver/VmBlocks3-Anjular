'use strict';

/**
 * @ngdoc function
 * @name vmBlocks3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vmBlocks3App
 */

angular.module('vmBlocks3App')
  .controller('MainCtrl', function ($scope, $http, $location, VmWebAPI) {
    // dummies values before we hook up to  a web service
<<<<<<< HEAD
   
    var VmesaURL = "http://demo1.svmesa.com/vmwebapi/Odata/MesaBlocks";

    $http.get(VmesaURL)
      .success(function (response) {
        // console.log (response);
        $scope.RawHtmlReturn = response;
        $scope.blocks = response.value
         console.log (response.value);
      });
      
      $scope.NavigateTo = function() {
        console.log("calling navigate " + $scope.selectedBlock.sName);   
        
        $location.path("/MesaBlock/" +  $scope.selectedBlock.sName);     // need to add the block to load the form on 
=======
    
    var OnComplete = function (data) {
      $scope.blocks = data;
    };

    var OnError = function (reason) {
      $scope.error = "could not find details";
    };

    $scope.NavigateTo = function () {
      console.log("calling navigate " + $scope.selectedBlock);

      $location.path("/MesaBlock");     // need to add the block to load the form on 
>>>>>>> 39e3a3ab40a889084f5000031b5b77c4194b3136
        
    }

    VmWebAPI.getBlocks()
      .then(OnComplete, OnError);


  });
  
  
