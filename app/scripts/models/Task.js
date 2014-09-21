(function(app) {
	'use strict';

	app.factory('Task', ['$resource', function($resource) {
		return $resource('/api/task');
	}]);
	
}(window.TASKER));