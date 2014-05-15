// loadmodule.js

var hello1 = require('./module');
hello1.setName('Rocky');

var hello2 = require('./module');
hello2.setName('Rocky2');

hello1.sayHello();