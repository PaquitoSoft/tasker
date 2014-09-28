(function(app) {

	app.controller('TasksActionsController',
		['$scope', '$rootScope', '$modal', '$cookies', 'Category',
			function($scope, $rootScope, $modal, $cookies, Category) {

		var createTaskPanel;

		$scope.statuses = [
			'Cualquiera',
			'Nueva',
			'En espera',
			'Finalizada'
		];

		$scope.selectedFilters = {
			category: 'Todas',
			status: 'Cualquiera'
		};

		$scope.newCategoryName = '';
		$scope.visible = $cookies.registered === 'true';
		
		$scope.selectFilter = function(event, value, filter) {
			event.preventDefault();
			$scope.selectedFilters[filter] = value;
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

		Category.query(function(categories) {
			$scope.categories = categories;
		});

	}]);

}(window.TASKER));