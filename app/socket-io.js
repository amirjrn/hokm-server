"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioEvents = require('./routes');
var init = function (app) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    const redis = require('socket.io-redis');
    io.adapter(redis({ host: 'redis-server', port: 6379 }));
    // Define all Events
    ioEvents(io);
    // The server object will be then used to list to a port number
    return server;
};
module.exports = init;
