// http_request.js
// can not running successfully

var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
	name: 'Rocky',
	email: 'rockylearningcs@gmail.com',
	address: 'Where am I?',
});

var option = {
	host: 'www.byvoid.com',
	path: '/application/node/post.php',
	method: 'POST',
	headers:{
		'Content-Type': 'applicaton/x-www-form-urlencoded',
		'Content-Length': contents.length
	}
};

var req = http.request(option, function(res){
	res.setEncoding('utf8');
	res.on('data',function(data){
		console.log(data);
	});
});

req.write(contents);
req.end();