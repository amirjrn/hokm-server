import {
  sendName,
  reqListOfGames,
  createRoom,
  joinGame,
  hokm,
  sendCard,
  playerDisconnected,
} from './controllers/index.js'
import errorHandler from './controllers/helpers/errorHandler'
// Routes should not be tightly coupled to socket library so we inject io object to routes
export function ioEvents(io) {
  // Add event listeners after a user has connected.
  io.on('connection', function (socket) {
    socket.on('join', errorHandler(sendName(socket)))
    socket.on('reqListOfGames', errorHandler(reqListOfGames(socket)))
    socket.on('createGame', errorHandler(createRoom(socket, io)))
    socket.on('joinGame', errorHandler(joinGame(socket, io)))
    socket.on('hokm', errorHandler(hokm(socket, io)))
    socket.on('sendCard', errorHandler(sendCard(socket, io)))
    socket.on('disconnect', errorHandler(playerDisconnected(socket)))
    socket.emit('numberOfPlayers', io.connections)
  })
}
