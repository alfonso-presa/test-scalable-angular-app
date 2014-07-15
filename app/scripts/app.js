'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
 *
 * Main module of the application.
 */
define(function(){ return function(angular, element){
	var app = angular
  .module('TestingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
	'ui.router',
    'ngSanitize',
    'ngTouch'
  ]);
  
  app.config(function($stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide,$urlRouterProvider, $locationProvider){
	app.controllerProvider = $controllerProvider;
	app.compileProvider    = $compileProvider;
	app.stateProvider      = $stateProvider;
	app.filterProvider     = $filterProvider;
	app.provide            = $provide;
	
	var load = function(file){
		return function($q, $rootScope)
		{
			var deferred = $q.defer();
			requireFromFile(file, function(modules){
				modules["controller"](app);
				$rootScope.$apply(function()
				{
					deferred.resolve();
				});
			});
			return deferred.promise;
		}
	};
  
	$stateProvider
      .state('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
		resolve:{deps:load("scripts/controllers/main")}
      })
      .state('/app', {
		url: '/app',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
		resolve:{deps:load("scripts/controllers/main")}
      })	  
      .state('/app/about', {
		url: '/app/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
		resolve:{deps:load("scripts/controllers/about")}
      });	  
	$locationProvider
	  .html5Mode(false)
	  .hashPrefix('!');
	  
	});
	app.run(function($state){
		if($state.is('')){
			$state.go('/');
		}
	});	
	
	angular.bootstrap(element, ["TestingApp"]);	
	return app;

}});