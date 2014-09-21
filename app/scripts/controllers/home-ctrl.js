(function(APP) {

	APP.controller('HomeController', ['$scope', '$window', '$location', '$rootScope', 'authService', 'localStorageService', '$cookies',
		function($scope, $window, $location, $rootScope, authService, localStorage, $cookies) {

		// 1.- Check if I have a stored token
		// 1.1.- Validate token
		// 2.- Check if I have an URL param token
		// 2.1.- Validate token
		// 3.- Render login page or redirect to tasks view
/*
		var hash = $location.hash(),
			prevToken = localStorage.get('tkn'),
			accessToken;

		if (hash) {
			// Check for auth parameters
			hash = hash.split('&');
			if (hash[0] && hash[0].match(/access_token/)) {
				accessToken = hash[0].split('=')[1];
			}
		} else if (prevToken && prevToken.length) {
			accessToken = prevToken;
		}

		// We need to validate the token
		if (accessToken) {
			authService.validateAuthToken(accessToken)
			.then(function(userEmail) {

				// console.log('Success!!!', arguments);

				$rootScope.user = {
					id: 'gl_' + userEmail
				};

				localStorage.set('tkn', accessToken);

				$rootScope.$emit('USER_LOGGED_IN');

				$location.hash('');
				$location.path('/tasks.html');

			}, function() {
				console.log('Error!!!', arguments);
				$location.path('/logon.html');
			});
		} else {
			$location.path('/logon.html');
		}
*/		
		console.log('Cookie:', $cookies.registered);
		$location.path(($cookies.registered === 'true') ? '/tasks.html' : '/logon.html');
	}]);

}(window.TASKER));
