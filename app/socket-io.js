"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const redisHost = process.env.REDIS_HOST;
var init = function (app) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    const redis = require('socket.io-redis');
    io.adapter(redis({ host: redisHost, port: 6379 }));
    // Define all Events
    routes_1.ioEvents(io);
    // The server object will be then used to list to a port number
    return server;
};
module.exports = init;
