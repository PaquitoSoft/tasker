TASKER.controller('LogonController', ['$scope', '$window', function($scope, $window) {

	var url = "https://accounts.google.com/o/oauth2/auth?" +
		"response_type=token" +
		"&client_id=337401479804-qags7cttaqlc1npoore30r3eop0gh1bk.apps.googleusercontent.com" +
		"&redirect_uri=http://localhost:8000/" +
		"&scope=email profile";
		// "&scope=https://www.googleapis.com/auth/userinfo.email";

	$scope.logon = function() {
		console.log('Vamos que nos vamos!!!', $window.location.href);
		$window.location.href = url;
	};

}]);