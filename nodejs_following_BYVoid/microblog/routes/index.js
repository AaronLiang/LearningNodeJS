var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title : '首页'
	});
});

console.log('index.js');
module.exports = router;