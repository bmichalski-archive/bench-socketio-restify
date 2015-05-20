var begin = new Date();

var socket = require('socket.io-client')('http://localhost:3000');

var countSuccesses = 0;

socket.on('logSuccess', function () {
    countSuccesses += 1;

    if (countSuccesses === 100000) {
        var endSuccesses = new Date();

        console.log('endSuccesses', endSuccesses.getTime() - begin.getTime());
    }
});

for (i = 0; i < 100000; i += 1) {
    socket.emit('log', { test: 'test' });
}

var endRequests = new Date();

console.log('endRequests', endRequests.getTime() - begin.getTime());