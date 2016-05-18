'use strict';
var url = "http://localhost:8081/control-gastos";
//var url = "http://172.16.4.147:8081/control-gastos";
/**
 * @ngdoc overview
 * @name infoGastosApp
 * @description
 * # infoGastosApp
 *
 * Main module of the application.
 */
var App = angular.module('infoGastosApp',[
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'material.svgAssetsCache',
    'ngRoute'
  ]);

App.config(function($routeProvider) {
  $routeProvider
    .when('/addBuy', {
      templateUrl: 'views/templates/addTicket.html',
      controller: 'AddTicketController'
    })
    .when('/dataExploitation', {
      templateUrl: 'views/templates/dataExploitation.html',
      controller: 'AddTicketController'
    })
    .otherwise({
      redirectTo: '/addBuy'
    });
});


