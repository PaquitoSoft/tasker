(function(APP) {
	
	APP.controller('CreateTaskController', ['$scope', '$rootScope', '$modalInstance', function($scope, $rootScope, $modalInstance) {

		$scope.categories = ['Arq. sistemas', 'Código web mobile'];
		$scope.selectedCategory = '';

		$scope.dt = new Date();
		$scope.initDate = $scope.dt;
		$scope.opened = false;

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = true;
		};

		$scope.createTask = function(form) {
			console.log('Let\'s craete a new Task:', $scope.title, '-', $scope.desc);
			if ($scope.title && $scope.title.length) {
				$rootScope.$emit('new-task-created', {
					title: $scope.title,
					status: 'new',
					description: $scope.desc,
					category: $scope.selectedCategory,
					creationDate: moment().format('L'), // TODO Global dependency
					comments: []
				});
			}
			$modalInstance.dismiss('created');
		};

		$scope.cancel = function(event) {
			event.preventDefault();
			$modalInstance.dismiss('cancel');
		};

	}]);

}(window.TASKER));