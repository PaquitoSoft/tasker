(function(app) {

	app.controller('TasksActionsController',
		['$scope', '$rootScope', '$modal', '$cookies', 'Category',
			function($scope, $rootScope, $modal, $cookies, Category) {

		var createTaskPanel;

		$scope.newCategoryName = '';
		$scope.visible = $cookies.registered === 'true';
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

		Category.query(function(categories) {
			$scope.categories = categories;
		});

		$scope.createCategory = function() {
			var cat;
			if ($scope.newCategoryName.trim().length) {
				cat = new Category({
					name: $scope.newCategoryName.trim()
				});
				$scope.categories.push(cat);
				cat.$save();
				$scope.newCategoryName = '';
			}
		};

	}]);

}(window.TASKER));