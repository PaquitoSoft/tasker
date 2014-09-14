(function(APP) {
	'use strict';

	APP.factory('Tasks', ['$firebase', 'fbURL', function($firebase, fbURL) {
		return $firebase(new Firebase(fbURL)).$asArray();
	}]);
}(window.TASKER));