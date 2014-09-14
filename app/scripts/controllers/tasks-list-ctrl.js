(function(APP) {
	'use strict';

	APP.controller('TasksListController', ['$scope', 'Tasks', '$rootScope', '$timeout', function($scope, Tasks, $rootScope, $timeout) {

		var tasks = [
			{
				title: 'Revisar marcado para tarjeta empleado',
				status: 'waiting',
				description: 'Tenemos que poder diferenciar el panel de tarjeta regalo del de empleado para GA',
				creationDate: '14/08/2014',
				comments: [
					{date: '15/08/2014', message: 'Esperando a que Miguel suba el cambio del api REST al SVN.'}
				]
			},
			{
				title: 'Revisar marcado para tarjeta empleado',
				status: 'new',
				description: 'Tenemos que poder diferenciar el panel de tarjeta regalo del de empleado para GA',
				creationDate: '14/08/2014',
				comments: [
					{date: '15/08/2014', message: 'Esperando a que Miguel suba el cambio del api REST al SVN.'}
				]
			},
			{
				title: 'Revisar marcado para tarjeta empleado',
				status: 'closed',
				description: 'Tenemos que poder diferenciar el panel de tarjeta regalo del de empleado para GA',
				creationDate: '14/08/2014',
				comments: [
					{date: '15/08/2014', message: 'Esperando a que Miguel suba el cambio del api REST al SVN.'}
				]
			},
			{
				title: 'Revisar marcado para tarjeta empleado',
				status: 'waiting',
				description: 'Tenemos que poder diferenciar el panel de tarjeta regalo del de empleado para GA',
				creationDate: '14/08/2014',
				comments: [
					{date: '15/08/2014', message: 'Esperando a que Miguel suba el cambio del api REST al SVN.'}
				]
			},
			{
				title: 'Revisar marcado para tarjeta empleado',
				status: 'new',
				description: 'Tenemos que poder diferenciar el panel de tarjeta regalo del de empleado para GA',
				creationDate: '14/08/2014',
				comments: [
					{date: '15/08/2014', message: 'Esperando a que Miguel suba el cambio del api REST al SVN.'}
				]
			}/*,
			{
				title: 'Revisar marcado para tarjeta empleado',
				status: 'closed',
				description: 'Tenemos que poder diferenciar el panel de tarjeta regalo del de empleado para GA',
				creationDate: '14/08/2014',
				comments: [
					{date: '15/08/2014', message: 'Esperando a que Miguel suba el cambio del api REST al SVN.'}
				]
			}*/
		];

		$scope.tasks = Tasks;
		console.log(Tasks);

		// Tasks.query({owner: $rootScope.user.id}, function() {
		//	console.log('These are the tasks:', arguments);
		// });

		// tasks.forEach(function(t) {
		//	t.owner = $rootScope.user.id;
		//	Tasks.$add(t).then(function() {
		//		console.log('Tasks created!!!');
		//	});
		// });

		$rootScope.$on('new-task-created', function(event, task) {
			$scope.tasks.push(task);
		});

	}]);

}(window.TASKER));
