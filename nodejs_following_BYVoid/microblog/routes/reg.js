var express = require('express');
var router = express.Router();
var checkStatus = require('./check_status');

/* GET registration page. */
var crypto = require('crypto');
var User = require('../models/user.js');

router.get('/reg', checkStatus.checkNotLogin);
router.get('/reg', function(req, res) {
	res.render('reg', {
		title : '用户注册'
//		user : req.session.user,
//		success : req.flash('success').toString(),
//		error : req.flash('error').toString()
	});
});

/* POST registration page. */
router.post('/reg', checkStatus.checkNotLogin);
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
			err = '用户已存在。';
		if (err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}
		// 如果不存在则新增用户
		newUser.save(function(err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', '祝贺您注册成功！');
			req.flash('error', null);
			req.session.save(); // very important!!
			return res.redirect('/');
		});
	});
});

module.exports = router;