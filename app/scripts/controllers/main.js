'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
define(function(){return function(app){
	app.controllerProvider.register('MainCtrl', function ($scope) {
		$scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];
		$scope.test='Sample model value from Main controller';
	});
}});
