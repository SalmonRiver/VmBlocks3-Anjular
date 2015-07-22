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
    $scope.MesaBlock = {
      BlockName: "B-101",
      status: "off",
      dFlow: 121.23,
      dDuty: 0,
      dTemperature: 650.2,
      dPressure: 175.22,
      dEfficiency: 75,
      dBlowDown: 2.5,
      sDutyUnits: "mmBtu/Hr",
      sFlowUnits: "kLb/Hr",
      sTemperatureUnits: "F",
      sPressureUnits: "PSIG",
      sBlowDownUnits: "%",
      sEfficiencyUnits: "%",
      bFlowIfTrue: true,
      bExhaustPressureIfTrue: true,
      
    }
        var VmesaURL = "http://demo1.svmesa.com/vmwebapi/Odata/MesaBlocks";

	$http.get (VmesaURL)
		.success(function(response){
     // console.log (response);
		$scope.RawHtmlReturn = response;
    $scope.blocks = response.value
   // console.log (response.value);
		}); 
    
    
    
    // MY ATTEMPT TO CREATE AN ARRAY AND FILL IT WITH SCOPE DATA, BROKE ANGULAR FUNCTIONS
    //var MesaData[
    //  blockname: block.sName
  //  ]
    


  });
  
  
