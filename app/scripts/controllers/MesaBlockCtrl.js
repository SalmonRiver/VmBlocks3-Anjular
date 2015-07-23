'use strict';

/**
 * @ngdoc function
 * @name vmBlocks3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vmBlocks3App
 */

angular.module('vmBlocks3App')
  .controller('MesaBlockCtrl', function ($scope, VmWebAPI, $location) {
    // dummies values before we hook up to  a web service
    $scope.MesaBlock = {
      BlockName: "B-101",
      Status: "off",
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
      sDescription: "Some text about the block goes here.  can have line feeds etc"
    }

    var url = $location.url();
    var sBlockName = url.replace("/MesaBlock/", "");

    var StatusEnum = {
      StatusOn: 1,
      StatusOff: 2,
      StatusUnavailable: 3,
      properties: {
        1: { name: "StatusOn", value: 1, code: "S" },
        2: { name: "StatusOff", value: 2, code: "M" },
        3: { name: "StatusUnavailable", value: 3, code: "L" }
      }
    };
    
    // need  to condition the url removing special characters 
    
    var OnComplete = function (data) {
      console.log(data[0].StringValue);
      console.log(data[0]);
      $scope.MesaBlock.dFlow = data[0].StringValue;
      $scope.MesaBlock.dDuty = data[0].PropertyIndex;
      $scope.MesaBlock.BlockName = data[0].BlockName;


//not working below here  gave up and ran out of time 
      if (data[0].PropertyIndex == '90') {
        var iStatus = data[0].StringValue
        switch (iStatus) {
          case StatusEnum.StatusOn.value:
            status = StatusEnum.StatusOn.name
            break;
          case StatusEnum.StatusOff.value:
            status = StatusEnum.StatusOff.name
            break;
          case StatusEnum.StatusUnavailable.value:
            status = StatusEnum.StatusUnavailable.name
            break;
        }
      //  $scope.MesaBlock.status = status
        console.log (status)
      }
      //    var iStatusValue =  $scope.MesaBlock.dFlow = data[0].StringValue;


      // var mYStatus = StatusEnum.StatusOn
     
      
      




    }

    var OnError = function (reason) {
      $scope.error = "could not find details";
    };

    VmWebAPI.getBlockDetails(sBlockName, 90, 1)
      .then(OnComplete, OnError);

  });
  