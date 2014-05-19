var express = require('express');
var connect = require('connect');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(connect);
var flash = require('connect-flash');

var settings = require('./models/settings');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
	secret : settings.cookieSecret,
	store : new MongoStore({
		db : settings.db
	})
}));
//app.use(app.router(routes));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(function(req,res, next){
	res.locals.user = req.session.user;
	
	var err = req.flash('error');
	if (err.length)
		res.locals.error = err;
	else
		res.locals.err = null;
	
	var succ = req.flash('success');
	if (succ.length)
		res.locals.success = succ;
	else
		res.locals.success = null;
	
	res.locals.session = req.session;
	next();
});

//app.get('/', routes.index);
//app.get('/u/:user', routes.user);
//app.post('/post', routes.post);
//app.get('/reg', routes.reg);
//app.post('/reg', routes.doReg);
//app.get('/login', routes.login);
//app.post('/login', routes.doLogin);
//app.get('/logout', routes.logout);
app.use(require('./routes/index'));

// / catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
