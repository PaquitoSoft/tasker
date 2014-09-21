'use strict';

var db = require('monk')('localhost/tasker'),
	tasks = db.get('tasks'),
	categories = db.get('categories');

var owner = 'gl_paquitosoftware@gmail.com';

var tasksData = [
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

var categoriesData = [
	{name: 'Arq. sistemas'},
	{name: 'Código web mobile'}
];

tasksData.forEach(function(task) {
	task.owner = owner;
	tasks.insert(task);
});

categoriesData.forEach(function(cat) {
	categories.insert(cat);
});

db.close();
