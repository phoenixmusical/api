'use strict';
const http = require('http');
const app = require('./app');

const server = module.exports = http.createServer(app);

server.listen(3000, function onListen() {
    const address = server.address();
    console.log('Server listening on %s:%d', address.address, address.port);
});
