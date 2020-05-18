import { Gamebuilder } from '../domain/game/game'
import findWithError from './helpers/findWithError'
import IgameDb from '../data-access/interfaces/IgameDb'
import IGame from '../domain/game/interfaces/IGame'

function makeListOfGames(gameDb: IgameDb): Function {
  return async function (): Promise<Array<string>> {
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
function makeAddPlayerToGame(gameDb: IgameDb): Function {
  return async function (gameName: string, socket_id: string, name: string) {
    const game_data = await findWithError(gameName, gameDb)
    const game = new Gamebuilder(game_data.nameOfGame)
      .reBuild(game_data)
      .build()
    const add_player_result = game.game_players.addPlayer(socket_id, name)
    gameDb.insertObject(gameName, game.GetState())
    return { game, add_player_result }
  }
}
function makePlayCard(gameDb: IgameDb): Function {
  return async function (card, name, gameName) {
    const game_data = await findWithError(gameName, gameDb)
    const game = new Gamebuilder(game_data.nameOfGame)
      .reBuild(game_data)
      .build()
    const result = game.table.playCard(card, name)
    gameDb.insertObject(gameName, game.GetState())
    return { game, result }
  }
}
function makeHokm(gameDb: IgameDb): Function {
  return async function (suit, name, gameName) {
    const game_data = await findWithError(gameName, gameDb)
    const game = new Gamebuilder(game_data.nameOfGame)
      .reBuild(game_data)
      .build()
    game.table.hokm(suit, name)
    gameDb.insertObject(gameName, game.GetState())
    return game
  }
}
export {
  makeAddGame,
  makeListOfGames,
  makeFindGame,
  makePlayCard,
  makeHokm,
  makeAddPlayerToGame,
}
