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
  .module('TestingApp2', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ]);
  
  app.config(function($stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider){
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
        templateUrl: 'views/main2.html',
        controller: 'MainCtrl2',
		resolve:{deps:load("scripts/controllers2/main")}
      })
      .state('/app2', {
		url: '/app2',	  
        templateUrl: 'views/main2.html',
        controller: 'MainCtrl2',
		resolve:{deps:load("scripts/controllers2/main")}
      })	  
      .state('/app2/about', {
		url: '/app2/about',	  
        templateUrl: 'views/about2.html',
        controller: 'AboutCtrl2',
		resolve:{deps:load("scripts/controllers2/about")}
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
	angular.bootstrap(element, ["TestingApp2"]);
	return app;

}});