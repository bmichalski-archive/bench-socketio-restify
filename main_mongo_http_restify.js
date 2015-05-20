/*jslint nomen: true, indent: 2 */
/*global require, console */

(function () {
  'use strict';

  var begin,
    restify,
    client,
    successCount,
    i,
    endRequests;

  begin = new Date();

  restify = require('restify');

  client = restify.createJsonClient({
    url: 'http://localhost:8080',
    version: '~1.0'
  });

  successCount = 0;

  function then(
    err,
    req,
    res,
    obj
  ) {
    if (JSON.parse(res.body).status === 'success') {
      successCount += 1;
    }

    if (successCount === 100000) {
      var endSuccesses;

      endSuccesses = new Date();

      console.log('endSuccesses', endSuccesses.getTime() - begin.getTime());
    }
  }

  for (i = 0; i < 100000; i += 1) {
    client.post(
      '/log',
      [
        { test: 'test' }
      ],
      then
    );
  }

  endRequests = new Date();

  console.log(
    'endRequests',
    endRequests.getTime() - begin.getTime()
  );
}());