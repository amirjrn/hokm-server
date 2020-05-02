"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioEvents = require('./io-events');
const redis = require('socket.io-redis');
var init = function (app) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    io.adapter(redis({ host: 'localhost', port: 6379 }));
    // Define all Events
    ioEvents(io);
    // The server object will be then used to list to a port number
    return server;
};
module.exports = init;
