import { Gamebuilder } from '../domain/game'
import { addPlayer } from './palyers';
import findWithError from './helpers/findWithError'
import IgameDb from '../data-access/interfaces/IgameDb'
import IGame from '../domain/interfaces/IGame'
function makeListOfGames(gameDb: IgameDb): Function {
    return async function (): Promise<Array<string>> {
        return await gameDb.findAll();
    }
}

function makeAddGame(gameDb: IgameDb): Function {
    return async function (name: string): Promise<void> {
        if (await gameDb.findByName(name)) {
            throw new Error('این اتاق وجود دارد. لطفا نام دیگری وارد کنید');
        }
        return gameDb.insertObject(name, new Gamebuilder(name).build().GetState());
    }
}


function makeFindGame(gameDb: IgameDb): Function {
    return async function (gameName: string): Promise<IGame> {
        const game = await gameDb.findByName(gameName);
        if (game) {
            return game;
        }
        throw new Error("Game did not found");
    }
}
function makeAddPlayerToGame(gameDb: IgameDb): Function {
    return async function (gameName: string, socket_id: string, name: string) {
        const game_data = await findWithError(gameName, gameDb);
        const game = new Gamebuilder(game_data.name).reBuild(game_data).build();
        const add_player_result = game.game_players.addPlayer(socket_id, name);
        gameDb.insertObject(gameName, game.GetState())
        return { game, add_player_result }
    }
}
function makePlayCard(gameDb: IgameDb) {
    return async function (card, name, gameName) {
        const game_data = await findWithError(gameName, gameDb);
        const parsed_game_data = JSON.parse(game_data);
        const game = new Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
        const result = game.table.playCard(card, name);
        return { game, result };
    }
}
function makeHokm(gameDb: IgameDb) {
    return async function (suit, name, gameName) {
        const game_data = await findWithError(gameName, gameDb);
        const parsed_game_data = JSON.parse(game_data);
        const game = new Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
        game.table.hokm(suit, name);
        return game;
    }
}
export {
    addPlayer,
    makeAddGame,
    makeListOfGames,
    makeFindGame,
    makePlayCard,
    makeHokm,
    makeAddPlayerToGame
}