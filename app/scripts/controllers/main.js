'use strict';

/**
 * @ngdoc function
 * @name vmBlocks3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vmBlocks3App
 */
 

 
 
angular.module('vmBlocks3App')
  .controller('MainCtrl', function ($scope) {
    // dummies values before we hook up to  a web service
    $scope.MesaBlock = {
      BlockName: "B-101",
      status: "Off",
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
    


  });
  
  
