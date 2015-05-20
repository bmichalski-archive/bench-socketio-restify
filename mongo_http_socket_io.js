/*jslint nomen: true, indent: 2 */
/*global require, console */

(function () {
  'use strict';

  var MongoClient;

  MongoClient = require('mongodb');

  MongoClient.connect(
    'mongodb://bench-mongo/test',
    {
      connectTimeoutMS: 500,
      socketTimeoutMS: 500
    },
    function (err, db) {
      if (err) {
        console.log(err);
      } else {
        var collection,
          server,
          io;

        collection = db.collection('test');

        collection.drop();

        server = require('http').createServer();
        io = require('socket.io')(server);
        io.on('connection', function (socket) {
          socket.on('log', function (data) {
            collection.insert(
              data,
              function (err) {
                if (err) {
                  console.log(err);
                  socket.emit('logError');
                } else {
                  socket.emit('logSuccess');
                }
              }
            );
          });
        });
        server.listen(3000);
      }
    }
  );
}());