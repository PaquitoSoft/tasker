TASKER.controller('LogonController', ['$scope', '$window', function($scope, $window) {

	var url = "https://accounts.google.com/o/oauth2/auth?" +
		// "response_type=token" +
		"response_type=code" +
		"&client_id=337401479804-qags7cttaqlc1npoore30r3eop0gh1bk.apps.googleusercontent.com" +
		// "&redirect_uri=http://localhost:8000/external-logon" +
		"&redirect_uri=http://ps-tasker.herokuapp.com/external-logon" +
		"&scope=email profile";

	$scope.logon = function() {
		console.log('Vamos que nos vamos!!!', $window.location.href);
		$window.location.href = url;
	};

}]);