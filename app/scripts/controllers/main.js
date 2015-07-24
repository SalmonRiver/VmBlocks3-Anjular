'use strict';

/**
 * @ngdoc function
 * @name vmBlocks3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vmBlocks3App
 */

angular.module('vmBlocks3App')
  .controller('MainCtrl', function ($scope, $http, $location, VmWebAPI, $filter) {
    // dummies values before we hook up to  a web service
    
    $scope.NavigateTo = function () {
    //  console.log("calling navigate " + $scope.selectedBlock.sName);

      $location.path("/MesaBlock/" + $scope.selectedBlock.sName);     // need to add the block to load the form on 
    }

    var OnComplete = function (data) {
      $scope.blocks = data;
     // currently this filter brings back boiler efficiency blocks as well
      var Boilers = $filter('filter')(data, { eComponentType: "vm_mbt_boiler" })
      $scope.Boilers = Boilers;
    };

    var OnError = function (reason) {
      $scope.error = "could not find details";
    };

    VmWebAPI.getBlocks()
      .then(OnComplete, OnError);


  });
  
