var begin = new Date();

var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '~1.0'
});

var successCount = 0;

for (i = 0; i < 100000; i += 1) {
    client.post('/log', [{ test: 'test' }], function (err, req, res, obj) {
        if (JSON.parse(res.body).status === 'success') {
            successCount += 1;
        }

        if (successCount === 100000) {
            var endSuccesses = new Date();

            console.log('endSuccesses', endSuccesses.getTime() - begin.getTime());
        }
    });
}

var endRequests = new Date();

console.log('endRequests', endRequests.getTime() - begin.getTime());