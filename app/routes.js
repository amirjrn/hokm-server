"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./Controllers/index.js");
const errorHandler_1 = require("./Controllers/helpers/errorHandler");
function ioEvents(io) {
    io.on('connection', function (socket) {
        socket.on("sendName", errorHandler_1.default(index_js_1.sendName(socket)));
        socket.on("reqListOfGames", errorHandler_1.default(index_js_1.reqListOfGames(socket)));
        socket.on('create-room', errorHandler_1.default(index_js_1.createRoom(socket, io)));
        socket.on('join-game', errorHandler_1.default(index_js_1.joinGame(socket, io)));
        socket.on('hokm', errorHandler_1.default(index_js_1.hokm(socket, io)));
        socket.on('sendcard', errorHandler_1.default(index_js_1.sendCard(socket, io)));
        socket.on('disconnect', errorHandler_1.default(index_js_1.playerDisconnected(socket)));
    });
}
module.exports = ioEvents;
