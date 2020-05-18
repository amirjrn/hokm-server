import {
  addGame,
  listOfGames,
  addPlayerToGame,
  playCard,
  sendHokm,
} from '../use-cases/index'
import { addPlayer, removePlayer, disconnectPlayer } from '../use-cases/index'
import checkStartGame from './helpers/checkStartGame'
import checkWinner from './helpers/checkWinner'

export function sendName(socket) {
  return async (name, callback) => {
    await addPlayer(name, socket.id, callback)
  }
}
export function reqListOfGames(socket) {
  return async () => {
    const list_of_games = await listOfGames()
    socket.emit('listOfGames', list_of_games)
  }
}
export function createRoom(socket, io) {
  return async function (gameName: string) {
    await addGame(gameName)
    io.emit('newGame', gameName)
  }
}
export function joinGame(socket, io) {
  return async (gameName: string, name: string) => {
    const { game, add_player_result } = await addPlayerToGame(
      gameName,
      socket.id,
      name
    )
    const other_players = game.game_players.players.filter(
      (player) => player.socket_id !== socket.id
    )
    other_players.map((player) => socket.emit('prev-players', player.name))
    other_players.map((player) =>
      io.to(player.socket_id).emit('new-user', name)
    )
    checkStartGame(add_player_result, game, io)
  }
}
export function hokm(socket, io) {
  return async function (suit, name, gameName) {
    const game = await sendHokm(suit, name, gameName)
    game.game_players.players.map((player) =>
      io.to(player.socket_id).emit('hokm', game.table.currentHokm)
    )
  }
}

export function sendCard(socket, io) {
  return async function (cardNumber, cardSuit, name, gameName) {
    var card = [Number(cardNumber), cardSuit]
    const { game, result } = await playCard(card, name, gameName)
    socket.emit('remove-card', card)
    game.game_players.players.map((player) =>
      io.to(player.socket_id).emit('card-played', card, name)
    )
    checkWinner(result, game, io)
  }
}

export function playerDisconnected(socket) {
  return function () {
    removePlayer(socket.id)
  }
}
