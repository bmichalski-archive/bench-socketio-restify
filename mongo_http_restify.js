/*jslint nomen: true, indent: 2 */
/*global require, console */

(function () {
  'use strict';

  var restify,
    MongoClient;

  restify = require('restify');

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
          server;

        collection = db.collection('test');

        collection.drop();

        server = restify.createServer({
          name: 'app',
          version: '1.0.0'
        });

        server.use(restify.acceptParser(server.acceptable));
        server.use(restify.queryParser());
        server.use(restify.bodyParser());

        server.post('/log', function (req, res, next) {
          collection.insert(
            req.body,
            function (err) {
              if (err) {
                console.log(err);
                res.send({ status: 'error' });
              } else {
                res.send({ status: 'success' });
              }
            }
          );

          return next();
        });

        server.listen(8080, function () {
          console.log('%s listening at %s', server.name, server.url);
        });
      }
    }
  );
}());