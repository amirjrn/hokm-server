import { gamesDb, playersDb, sessionsDb } from './../data-access/index'
import {
  makeAddGame,
  makeFindGame,
  makeListOfGames,
  makeAddPlayerToGame,
  makePlayCard,
  makeHokm,
} from './games.js'
import { makeAddPlayer, makeRemovePlayer, makeDisconnectPlayer, makeReconnectPlayer } from './palyers'
import { randomBytes } from 'crypto'
// games use cases
const addGame = makeAddGame(gamesDb)
const findGame = makeFindGame(gamesDb)
const listOfGames = makeListOfGames(gamesDb)
const addPlayerToGame = makeAddPlayerToGame(gamesDb, sessionsDb)
const sendHokm = makeHokm(gamesDb)
const playCard = makePlayCard(gamesDb, sessionsDb)

// players use cases

const addPlayer = makeAddPlayer(playersDb, sessionsDb, (): string => {
  return randomBytes(16).toString('base64')
})
const removePlayer = makeRemovePlayer(playersDb)
const disconnectPlayer = makeDisconnectPlayer(playersDb)
const reconnectPlayer = makeReconnectPlayer(playersDb)

export {
  addGame,
  findGame,
  listOfGames,
  addPlayerToGame,
  sendHokm,
  playCard,
  addPlayer,
  removePlayer,
  disconnectPlayer,
  reconnectPlayer,
}
