/* check login */
module.exports.checkLogin = function(req, res, next){
	if (!req.session.user){
		req.flash('error', '未登入');
		req.session.save();
		return res.redirect('/login');
	}
	next();
};

/* check not login*/
module.exports.checkNotLogin = function(req, res, next){
	if (req.session.user){
		req.flash('error', '已登入');
		req.session.save();
		return res.redirect('/');
	}
	next();
};