"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./../socket/EventHandlers/index.js");
function ioEvents(io) {
    io.on('connection', function (socket) {
        socket.on("sendName", index_js_1.sendName(socket));
        socket.on("reqListOfGames", index_js_1.reqListOfGames(socket));
        socket.on('create-room', index_js_1.createRoom(socket, io));
        socket.on('join-game', index_js_1.joinGame(socket, io));
        socket.on('hokm', index_js_1.hokm(socket, io));
        socket.on('sendcard', index_js_1.sendCard(socket, io));
        //add dissconnection event listener to every socket connected 
        socket.on('disconnect', index_js_1.playerDisconnected(socket));
    });
}
module.exports = ioEvents;
