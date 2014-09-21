(function(app) {
	'use strict';

	app.factory('Category', ['$resource', function($resource) {
		return $resource('/api/category');
	}]);
	
}(window.TASKER));