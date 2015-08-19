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

      sDutyUnits: "mmBtu/Hr",
      sFlowUnits: "kLb/Hr",
      sTemperatureUnits: "F",
      sPressureUnits: "PSIG",
      sBlowDownUnits: "%",
      sEfficiencyUnits: "%",
      sDescription: "Some text about the block goes here.  can have line feeds etc"
    }

    $scope.writeToVm = function () {
      VmWebAPI.vmWriteToBlock(); 
      
      console.log("writetoVm");
      

    }

    var url = $location.url();
    var sBlockName = url.replace("/MesaBlock/", "");
    var eStatusEnum = {
      ON: { name: "StatusOn", value: 1, code: "S" },
      OFF: { name: "StatusOff", value: 2, code: "M" },
      UNAVAILABLE: { name: "StatusUnavailable", value: 3, code: "L" },
    };


    
    
    // need  to condition the url removing special characters 
    var OnComplete = function (MesaBlockValues) {
      //   console.log("Getting data for property: " + MesaBlockValues.PropertyIndex + "   Value= " + MesaBlockValues.StringValue);
      $scope.MesaBlock.BlockName = MesaBlockValues.BlockName;

      if (MesaBlockValues.StringValue == "Invalid Property") {
        console.log(" No data returned");
        return;
      }

      if (MesaBlockValues.PropertyIndex == '7') {
        $scope.MesaBlock.dFlow = MesaBlockValues.StringValue;
        if ($scope.MesaBlock.dFlow > 0) $scope.MesaBlock.bFlowIfTrue = true
        else $scope.MesaBlock.bFlowIfTrue = false;
      }
      else if (MesaBlockValues.PropertyIndex == '8') {
        $scope.MesaBlock.dTemperature = MesaBlockValues.StringValue;
      }
      else if (MesaBlockValues.PropertyIndex == '9') {
        $scope.MesaBlock.dEfficiency = MesaBlockValues.StringValue;
      }
      else if (MesaBlockValues.PropertyIndex == '10') {
        $scope.MesaBlock.dBlowDown = MesaBlockValues.StringValue;
      }
      else if (MesaBlockValues.PropertyIndex == '11') {
        $scope.MesaBlock.dPressure = MesaBlockValues.StringValue;
        if ($scope.MesaBlock.dPressure == 0) $scope.MesaBlock.bExhaustPressureIfTrue = true
        else $scope.MesaBlock.bExhaustPressureIfTrue = false
      }
      else if (MesaBlockValues.PropertyIndex == '64') {
        $scope.MesaBlock.dDuty = MesaBlockValues.StringValue;
      }
      else if (MesaBlockValues.PropertyIndex == '90') {
        var iStatus = MesaBlockValues.StringValue;
        status = "unknown";
        if (iStatus == eStatusEnum.ON.value) status = eStatusEnum.ON.name
        if (iStatus == eStatusEnum.OFF.value) status = eStatusEnum.OFF.name
        if (iStatus == eStatusEnum.UNAVAILABLE.value) status = eStatusEnum.UNAVAILABLE.name

        $scope.MesaBlock.Status = status
      }

    }

    var OnError = function (reason) {
      $scope.error = "could not find details";
      console.log($scope.error);
    };

    VmWebAPI.getBlockProperty(sBlockName, 7, 1)
      .then(OnComplete, OnError);
    VmWebAPI.getBlockProperty(sBlockName, 8, 1)
      .then(OnComplete, OnError);
    VmWebAPI.getBlockProperty(sBlockName, 9, 1)
      .then(OnComplete, OnError);
    VmWebAPI.getBlockProperty(sBlockName, 10, 1)
      .then(OnComplete, OnError);
    VmWebAPI.getBlockProperty(sBlockName, 11, 1)
      .then(OnComplete, OnError);
    VmWebAPI.getBlockProperty(sBlockName, 64, 1)
      .then(OnComplete, OnError);
    VmWebAPI.getBlockProperty(sBlockName, 90, 1)
      .then(OnComplete, OnError);

  });
  