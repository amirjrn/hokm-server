import { sendName, reqListOfGames, createRoom, joinGame, hokm, sendCard, playerDisconnected } from './Controllers/index.js'
function ioEvents(io) {
    io.on('connection', function (socket) {
        socket.on("sendName", sendName(socket));
        socket.on("reqListOfGames", reqListOfGames(socket));
        socket.on('create-room', createRoom(socket, io));
        socket.on('join-game', joinGame(socket, io));
        socket.on('hokm', hokm(socket, io));
        socket.on('sendcard', sendCard(socket, io));
        //add dissconnection event listener to every socket connected 
        socket.on('disconnect', playerDisconnected(socket));
    });
}

module.exports = ioEvents;
export { }