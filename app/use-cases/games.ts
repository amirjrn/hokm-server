import { Gamebuilder } from '../domain/game/Game'
import findWithError from './helpers/findWithError'
import IgameDb from '../data-access/interfaces/IgameDb'
import IOnlinePlayer from '../domain/game/interfaces/IOnlinePlayer'
import IsessionDb from '../data-access/interfaces/IsessionDb'
import IGame from '../domain/game/interfaces/IGame'
import { sessionsDb } from '../data-access'

function makeListOfGames(gameDb: IgameDb): Function {
  return async function (): Promise<string[]> {
    return await gameDb.findAll()
  }
}

function makeAddGame(gameDb: IgameDb): Function {
  return async function (name: string) {
    if (await gameDb.findByName(name)) {
      throw new Error('این اتاق وجود دارد. لطفا نام دیگری وارد کنید')
    }
    return gameDb.insertObject(name, new Gamebuilder(name).build().GetState())
  }
}

function makeFindGame(gameDb: IgameDb): Function {
  return async function (gameName: string): Promise<IGame> {
    const game = await gameDb.findByName(gameName)
    if (game) {
      return game
    }
    throw new Error('Game did not found')
  }
}
function makeAddPlayerToGame(gameDb: IgameDb, sessionDb: IsessionDb) {
  return async function (gameName: string, socket_id: string, session: string) {
    const game_data = await findWithError(gameName, gameDb)
    const name = await sessionDb.findBySession(session)
    const game = new Gamebuilder(game_data.nameOfGame).reBuild(game_data).build()
    const add_player_result = game.game_players.addPlayer(socket_id, name, session)
    gameDb.insertObject(gameName, game.GetState())
    return { game, add_player_result, name }
  }
}
function makePlayCard(gameDb: IgameDb, sessionsDb: IsessionDb): Function {
  return async function (card, session, gameName) {
    const game_data = await findWithError(gameName, gameDb)
    const game = new Gamebuilder(game_data.nameOfGame).reBuild(game_data).build()
    const result = game.table.playCard(card, session)
    await gameDb.insertObject(gameName, game.GetState())
    const name = await sessionsDb.findBySession(session)
    return { game, result, name }
  }
}
function makeHokm(gameDb: IgameDb): Function {
  return async function (suit, session, gameName) {
    const game_data = await findWithError(gameName, gameDb)
    const game = new Gamebuilder(game_data.nameOfGame).reBuild(game_data).build()
    game.table.hokm(suit, session)
    gameDb.insertObject(gameName, game.GetState())
    return game
  }
}
export { makeAddGame, makeListOfGames, makeFindGame, makePlayCard, makeHokm, makeAddPlayerToGame }
