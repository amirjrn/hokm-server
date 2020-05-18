"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioEvents = void 0;
const index_js_1 = require("./controllers/index.js");
const errorHandler_1 = require("./controllers/helpers/errorHandler");
function ioEvents(io) {
    // Add event listeners after a user has connected.
    io.on('connection', function (socket) {
        socket.on('join', errorHandler_1.default(index_js_1.sendName(socket)));
        socket.on('reqListOfGames', errorHandler_1.default(index_js_1.reqListOfGames(socket)));
        socket.on('createGame', errorHandler_1.default(index_js_1.createRoom(socket, io)));
        socket.on('joinGame', errorHandler_1.default(index_js_1.joinGame(socket, io)));
        socket.on('hokm', errorHandler_1.default(index_js_1.hokm(socket, io)));
        socket.on('sendCard', errorHandler_1.default(index_js_1.sendCard(socket, io)));
        socket.on('disconnect', errorHandler_1.default(index_js_1.playerDisconnected(socket)));
        socket.emit('numberOfPlayers', io.connections);
    });
}
exports.ioEvents = ioEvents;
