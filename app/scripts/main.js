(function() {
	"use strict";

	window.TASKER = angular.module('Tasker', ['ngRoute', 'firebase', 'LocalStorageModule', 'ui.bootstrap']);

	window.TASKER.value('fbURL', 'https://blistering-fire-8531.firebaseio.com/');

	window.TASKER.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'views/home.html'
			})
			.when('/logon.html', {
				controller: 'LogonController',
				templateUrl: 'views/logon.html'
			})
			.when('/tasks.html', {
				controller: 'TasksListController',
				templateUrl: 'views/tasks-list.html'
			});

		// user History API
		$locationProvider.html5Mode(true).hashPrefix('!');
		// $locationProvider.hashPrefix('!');

	});

}());
