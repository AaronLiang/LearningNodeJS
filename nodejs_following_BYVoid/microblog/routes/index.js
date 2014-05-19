// orginal
//var express = require('express');
//var router = express.Router();
//
///* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});
//
//module.exports = router;

//setep1
//exports.index = function(req, res) {
//	res.render('index', {
//		title : 'RockyNiu'
//	});
//};
//exports.user = function(req, res) {
//};
//exports.post = function(req, res) {
//};
//exports.reg = function(req, res) {
//};
//exports.doReg = function(req, res) {
//};
//exports.login = function(req, res) {
//};
//exports.doLogin = function(req, res) {
//};
//exports.logout = function(req, res) {
//};

////setep2
//module.exports = function(app){
//	app.get('/', function(req, res){
//		res.render('index', {
//			title: '首页'
//		});
//	});
//	
//	app.get('/reg', function(req, res){
//		res.render('reg', {
//			title: '用户注册'
//		});
//	});
//};

// step3
var express = require('express');
var router = express.Router();

// dynamicHelper
router.use(function(req, res, next) {
	res.locals.user = req.session.user;

	var err = req.flash('error');
	if (err.length)
		res.locals.error = err;
	else
		res.locals.error = null;

	var succ = req.flash('success');
	if (succ.length)
		res.locals.success = succ;
	else
		res.locals.success = null;

	// res.locals.session = req.session;
	next();
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title : '首页',
		user : req.session.user,
		success : req.flash('success').toString(),
		error : req.flash('error').toString()
	});
});

/* GET registration page. */
var crypto = require('crypto');
var User = require('../models/user.js');
router.get('/reg', function(req, res) {
	res.render('reg', {
		title : '用户注册',
		user : req.session.user,
		success : req.flash('success').toString(),
		error : req.flash('error').toString()
	});
});

/* POST registration page. */
router.post('/reg', function(req, res) {
	// 检测用户两次输入的口令是否一致
	if (req.body['password-repeat'] != req.body['password']) {
		req.flash('error', '两次输入的口令不一致');
		return res.redirect('/reg');
	}
	// 生成口令的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		name : req.body.username,
		password : password,
	});

	// 检查用户是否已经存在
	User.get(newUser.name, function(err, user) {
		if (user)
			err = 'Username already exist.';
		if (err) {
			req.flash('error', err);
			return res.redirect('/req');
		}
		// 如果不存在则新增用户
		newUser.save(function(err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', '注册成功');
			return res.redirect('/');
		});
	});
});

module.exports = router;