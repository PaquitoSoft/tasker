(function(app) {
	'use strict';

	app.controller('TasksListController', ['$scope', '$rootScope', 'Task', function($scope, $rootScope, Task) {

		Task.query(function(tasks) {
			$scope.tasks = tasks;
		});

		$rootScope.$on('new-task-created', function(event, task) {
			$scope.tasks.push(task);
		});

	}]);

}(window.TASKER));
