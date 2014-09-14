'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var app = express();


/* ---------------- Models schema definitions ---------------- */
var TaskSchema = mongoose.Schema({
	title: String,
	description: String,
	status: String,
	category: String,
	creationDate: { type: Date, default: Date.now() },
	comments: [ { message: String, date: Date } ]
});
TaskSchema.methods.findByStatus = function(status, next) {
	return this.model('Task').find({ status: status }, next);
};
TaskSchema.methods.findByCategory = function(category, next) {
	return this.model('Task').find({ category: category }, next);
};
var Task = mongoose.model('Task', TaskSchema);

var Category = mongoose.model('Category', mongoose.Schema({
	name: String
}));


/* ---------------- Routes controllers --------------- */
var tasksRouter = express.Router();
tasksRouter.get('/', function(req, res, next) {
	Task.find(function(err, tasks) {
		if (err) {
			next(err);
		} else {
			res.json(tasks);
		}
	});
});
tasksRouter.get('/:id', function(req, res, next) {
	Task.findOne(req.params.id, function(err, task) {
		if (err) {
			next(err);
		} else {
			res.json(task);
		}
	});
});
function _taskUpsert(req, res, next) {
	var task = new Task(req.body);
	task.save(function(err, t) {
		if (err) {
			next(err);
		} else {
			res.json(t);
		}
	});
}
tasksRouter.put('/:id', _taskUpsert);
tasksRouter.post('/:id', _taskUpsert);


var categoriesRouter = express.Router();
categoriesRouter.get('/', function(req, res, next) {
	Category.find(function(err, categories) {
		if (err) {
			next(err);
		} else {
			res.json(categories);
		}
	});
});

/* ---------------- Common Middleware ---------------- */
app.use(bodyParser());


/* ---------------- Router Configuration ---------------- */
app.use('api/task', tasksRouter);
app.use('api/category', categoriesRouter);


/* ---------------- Error handler ---------------- */
app.use(function(err, req, res, next) {
	// TODO Error handling
	res.json(500, err);
});

