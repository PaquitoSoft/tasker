(function(APP) {
	
	APP.controller('CreateTaskController', ['$scope', '$rootScope', '$modalInstance', 'Task', 
		function($scope, $rootScope, $modalInstance, Task) {

		$scope.categories = ['Arq. sistemas', 'Código web mobile'];
		$scope.selectedCategory = '';

		$scope.dt = new Date();
		// $scope.initDate = $scope.dt;
		$scope.opened = false;

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = true;
		};

		$scope.createTask = function(form) {
			if ($scope.title && $scope.title.length) {
				var t = new Task({
					title: $scope.title,
					status: 'new',
					description: $scope.desc,
					category: $scope.selectedCategory,
					// creationDate: moment().format('L'), // TODO Global dependency
					creationDate: new Date(),
					comments: []
				});
				$rootScope.$emit('new-task-created', t);

				t.$save(function() {
					console.log('Task save server callback');
				});

				$modalInstance.dismiss('created');
			}
		};

		$scope.cancel = function(event) {
			event.preventDefault();
			$modalInstance.dismiss('cancel');
		};

	}]);

}(window.TASKER));