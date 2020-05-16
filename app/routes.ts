import { sendName, reqListOfGames, createRoom, joinGame, hokm, sendCard, playerDisconnected } from './Controllers/index.js'
import errorHandler from './Controllers/helpers/errorHandler'
function ioEvents(io) {
    io.on('connection', function (socket) {
        socket.on("sendName", errorHandler(sendName(socket)));
        socket.on("reqListOfGames", errorHandler(reqListOfGames(socket)));
        socket.on('create-room', errorHandler(createRoom(socket, io)));
        socket.on('join-game', errorHandler(joinGame(socket, io)));
        socket.on('hokm', errorHandler(hokm(socket, io)));
        socket.on('sendcard', errorHandler(sendCard(socket, io)));
        socket.on('disconnect', errorHandler(playerDisconnected(socket)));
    });
}

module.exports = ioEvents;
export { }