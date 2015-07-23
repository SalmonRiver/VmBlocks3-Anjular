'use strict';

/**
 * @ngdoc overview
 * @name vmBlocks3App
 * @description
 * # vmBlocks3App
 *
 * Main module of the application.
 */
angular
  .module('vmBlocks3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/svg', {
        templateUrl: 'views/svg.html',
        controller: 'SvgCtrl'
      })
      .when('/MesaBlock/:BlockName', {
        templateUrl: 'views/MesaBlock.html',
        controller: 'MesaBlockCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
  
