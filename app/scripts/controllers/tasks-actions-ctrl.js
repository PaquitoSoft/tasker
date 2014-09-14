(function(APP) {

	APP.controller('TasksActionsController',
		['$scope', '$rootScope', '$modal', function($scope, $rootScope, $modal) {

		var createTaskPanel;

		$scope.visible = false;
		$scope.searchTerm = '';

		$scope.search = function() {
			console.log('Searching tasks with search term:', $scope.searchTerm);
			console.log(arguments);
		};

		$scope.create = function(event) {
			console.log("TasksActionsController::create# TODO: show task creation form...");
			event.preventDefault();

			$modal.open({
				scope: $scope,
				templateUrl: 'views/create-task.html',
				controller: 'CreateTaskController'
			});
		};

		$rootScope.$on('USER_LOGGED_IN', function(user) {
			$scope.visible = true;
			_loadCategories(user);
		});

		function _loadCategories(user) {
			// TODO
			$scope.categories = ['Arq. sistemas', 'Código web mobile'];
		}

	}]);

}(window.TASKER));