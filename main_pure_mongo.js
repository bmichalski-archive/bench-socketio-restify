var MongoClient = require('mongodb');

var begin = new Date();

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
            var collection = db.collection('test');

            collection.drop();

            for (i = 0; i < 100000; i += 1) {
                collection.insert([
                    {
                        'test': 'test'
                    }
                ], function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            var end = new Date();

            console.log(end.getTime() - begin.getTime());
        }
    }
);