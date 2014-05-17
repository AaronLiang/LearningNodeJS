/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes/index')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view option', {
	layout : false
});

//helpers
var util = require('util');

// static helper
app.locals({
	inspect: function(obj){
		return util.inspect(obj, true);
	}
});

// dynamic helper
app.use(function(req, res, next){
	res.locals.headers = req.headers || 'welcome!';
	res.locals.foo = 'This is a dynanic var.';
	next();
});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/hello', routes.hello);
app.get('/helper', function(req, res){
	res.render('helper', {
		title: 'This is a Helper'
	});
});

var users = {
		'rocky' : {
			name: 'Carbo',
			website: 'http://www.rockyniu.com'
		}
};

app.get('/users', user.list);
app.get('/user/:username', function(req, res, next) {
	//检查用户是否存在
	if (users[req.params.username]){
		next();
	} else {
		next(new Error(req.params.username + ' does not exist.'));
	}
});
// 用户存在
app.get('/user/:username', function(req, res){
	res.send('user: ' + JSON.stringify(users[req.params.username]));
});
app.put('/user/:username', function(req, res){
	//修改用户信息
	res.send('Done');
});

app.get('/list', function(req, res){
	res.render('list_ejs', {
		title: 'List',
		items: [2014, 'Rocky', 'Learning', 'CS', 'Node.js']
	});
});


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
