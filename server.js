'use strict';

var path = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoSessionStore = require('connect-mongo')(session),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	request = require('request');

var app = express();
var httpPort = process.env.PORT || 8000;
var sidSalt = process.env.SIDSALR || 'FSAM,.DMSAfasd,fm.af---fasdf';
var mongoURL = process.env.TASKER_MONGO_URL || 'mongodb://localhost/tasker';
var database;

mongoose.connect(mongoURL);

/* ---------------- Helpers ------------------ */
function _validateAuthToken(authToken, next) {
	var url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + authToken;
	console.log('Validating auth token:', url);
	// request.debug = true;
	request({
		method: 'POST',
		url: 'https://accounts.google.com/o/oauth2/token',
		form: {
			code: authToken,
			client_id: '337401479804-qags7cttaqlc1npoore30r3eop0gh1bk.apps.googleusercontent.com',
			client_secret: '8BakJXVERQ1c82N-7bJPCaLq',
			// redirect_uri: 'http://localhost:8000/external-logon',
			redirect_uri: 'http://ps-tasker.herokuapp.com/external-logon',
			grant_type: 'authorization_code'
		}
	}, function(err, res, body) {
		// next(err, body);
		if (err) return next(err);
		var data = JSON.parse(body);
		request.get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + data.access_token,
			function(iErr, iRes, iBody) {
				next(iErr, iBody ? JSON.parse(iBody) : null);
			});
	});
}

function _sessionChecker(req, res, next) {
	if (!req.session.user && req.path.match(/\.html$/)) {
		// res.redirect('/');
		console.log('Esta ruta deberia tener una sesion asociada:', req.path);
		next();
	} else {
		next();
	}
}

/* ---------------- Models schema definitions ---------------- */
var TaskSchema = mongoose.Schema({
	owner: String,
	title: String,
	description: String,
	status: String,
	category: String,
	creationDate: { type: Date, default: Date.now() },
	comments: [ { message: String, date: Date } ]
});
TaskSchema.methods.findByOwner = function(owner, next) {
	return this.model('Task').find({owner: owner}, next);
};
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
	Task.find({owner: req.session.user.username}, function(err, tasks) {
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
	task.owner = task.owner || req.session.user.username;
	task.save(function(err, t) {
		if (err) {
			next(err);
		} else {
			res.json(t);
		}
	});
}
tasksRouter.put('/:id', _taskUpsert);
tasksRouter.post('/', _taskUpsert);


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
categoriesRouter.post('/', function (req, res, next) {
	var category = new Category(req.body);
	category.save(function(err, cat) {
		if (err) {
			next(err);
		} else {
			res.json(cat);
		}
	});
});

function _externalLoginHandler(req, res, next) {
	var authCode = req.query.code,
		errCode = req.query.error;
	
	console.log(req.query);
	console.log(req.body);

	if (errCode) {
		res.redirect('/');
	} else {
		_validateAuthToken(authCode, function(err, data) {
			/*
				{
					issued_to: '337401479804-qags7cttaqlc1npoore30r3eop0gh1bk.apps.googleusercontent.com',
					audience: '337401479804-qags7cttaqlc1npoore30r3eop0gh1bk.apps.googleusercontent.com',
					user_id: '117335273945131073552',
					scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
					expires_in: 3599,
					email: 'paquitosoftware@gmail.com',
					verified_email: true,
					access_type: 'online'
				}
			*/
			if (!err) {
				console.log('Access data:', data);
				req.session.user = {
					id: 'gl_' + data.user_id,
					username: 'gl_' + data.email,
					email: data.email
				};
				res.cookie('registered', 'true', { maxAge: 1500 * 1000 });
			}
			res.redirect('/');
		});
	}
}

/* ---------------- Common Middleware ---------------- */
app.use(logger('dev'));
app.use(bodyParser());
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: sidSalt,
	cookie: { maxAge: 1400 * 1000 },
	store: new MongoSessionStore({
		db: 'tasker',
		mongoose_connection: mongoose.connection
	})
}));
app.use(_sessionChecker);
app.use(express.static(path.join(__dirname, 'app')));


/* ---------------- Router Configuration ---------------- */
app.use('/api/task', tasksRouter);
app.use('/api/category', categoriesRouter);
app.use('/external-logon', _externalLoginHandler);


/* ---------------- Error handler ---------------- */
app.use(function(err, req, res, next) {
	// TODO Error handling
	console.log('Error handling response:', err);
	res.status(500).json(err);
});


/* ---------------- Let the show begin ------------- */
database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
	app.listen(httpPort, function() {
		console.log('Application up and listening on port:', httpPort);
	});
});