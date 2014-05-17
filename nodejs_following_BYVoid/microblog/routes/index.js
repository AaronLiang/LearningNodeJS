
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.hello = function(req, res){
	res.send('The time is  ' + new Date().toString());
};

//exports.helper = function(req, res){
//	res.render('helper', {
//		title: 'This is a Helper'
//	});
//};