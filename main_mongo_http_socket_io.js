/*jslint nomen: true, indent: 2 */
/*global require, console */

(function () {
  'use strict';

  var begin,
    socket,
    countSuccesses,
    i,
    endRequests;

  begin = new Date();

  socket = require('socket.io-client')('http://localhost:3000');

  countSuccesses = 0;

  socket.on('logSuccess', function () {
    var endSuccesses;

    countSuccesses += 1;

    if (countSuccesses === 100000) {
      endSuccesses = new Date();

      console.log(
        'endSuccesses',
        endSuccesses.getTime() - begin.getTime()
      );
    }
  });

  for (i = 0; i < 100000; i += 1) {
    socket.emit('log', [{ test: 'test' }]);
  }

  endRequests = new Date();

  console.log(
    'endRequests',
    endRequests.getTime() - begin.getTime()
  );
}());
