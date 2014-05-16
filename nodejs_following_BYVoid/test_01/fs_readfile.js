// fs_readfile.js

var fs = require("fs");

fs.readFile('fs_readfile.js', function(err,data){
	if (err){
		console.error(err);
	} else {
		console.log(data);
	}
});

fs.readFile('fs_readfile.js', 'utf-8', function(err,data){
	if (err){
		console.error(err);
	} else {
		console.log(data);
	}
});

fs.readFile('fs_readfile*.js', 'utf-8', function(err,data){
	if (err){
		console.error(err);
	} else {
		console.log(data);
	}
});