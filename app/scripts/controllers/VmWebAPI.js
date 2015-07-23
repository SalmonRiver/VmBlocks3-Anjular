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

    var getBlocks = function () {

      return $http.get(VmesaURL)
        .then(function (response) {
          console.log(response.data.value);
          return response.data.value;
        });
    };
    return {
      getBlocks: getBlocks
    };
  };

  var module = angular.module("vmBlocks3App"); module.factory("VmWebAPI", VmWebAPI);
} ());