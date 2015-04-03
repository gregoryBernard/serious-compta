'use strict';

angular
  .module('compta', ['ngMaterial', 'ngRoute'])
  .config(myConfig);

function myConfig($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/main'
    });
  $locationProvider.html5Mode(true);
}
