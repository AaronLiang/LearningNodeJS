var express = require('express');
var router = express.Router();
var checkStatus = require('./check_status');

/* GET login page. */
var crypto = require('crypto');
var User = require('../models/user.js');

router.get('/', checkStatus.checkNotLogin);
router.get('/', function (req, res){
	res.render('login', {
		title: '用户登入'
	});
});
/* POST login page. */
router.post('/', checkStatus.checkNotLogin);
router.post('/', function(req, res){
	//生成口令的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	
	User.get(req.body.username, function(err,user){
		if (!user){
			req.flash('error', '用户不存在');
			return res.redirect('/login');
		}
		if (user.password != password){
			req.flash('error', '口令错误，请重新输入');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', '登入成功');
		req.session.save();
		res.redirect('/');
	});
});

module.exports = router;