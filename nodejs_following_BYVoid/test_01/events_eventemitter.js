// events_eventemitter

var events = require('events');

var emitter = new events.EventEmitter();

emitter.once('someEvent', function(arg1, arg2) {
	console.log('listener1', arg1, arg2);
});

emitter.on('someEvent', function(arg1, arg2) {
	console.log('listener2', arg1, arg2);
});


emitter.emit('someEvent', 'Rocky', 2014);

//emitter.removeAllListeners('someEvent');

emitter.emit('someEvent');