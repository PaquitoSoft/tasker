'use strict';

TASKER.factory('authService', ['$http', '$q', function($http, $q) {
	
	var AUTH_TOKEN_VALIDATION_URL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={accessToken}';

	function _validateAuthToken(authToken) {
		var deferred = $q.defer();

		$http.get(AUTH_TOKEN_VALIDATION_URL.replace('{accessToken}', authToken))
			.success(function(data, status, headers, config) {
				
				// STATUS: 200
				// DATA: "{"issued_to":"337401479804-qags7cttaqlc1npoore30r3eop0gh1bk.apps.googleusercontent.com","audience":"337401479804-qags7cttaqlc1npoore30r3eop0gh1bk.apps.googleusercontent.com","user_id":"117335273945131073552","scope":"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile","expires_in":3174,"email":"paquitosoftware@gmail.com","verified_email":true,"access_type":"online"}"

				// console.log('AuthService::validateAuthToken# Success:', status, data);
				deferred.resolve(data.email);
			})
			.error(function(data, status, headers, config) {
				// console.log('AuthService::validateAuthToken# Error:', status, data);
				deferred.reject(new Error('Auth validation request error: ' + data));
			});

		return deferred.promise;
	}

	return {
		validateAuthToken: _validateAuthToken
	};
}]);