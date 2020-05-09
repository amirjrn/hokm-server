import { Game, Gamebuilder } from '../domain/game'
import { addPlayer } from './palyers';
import findWithError from './helpers/findWithError'

function makeAddGame(gamesDb) {
    return async function (name: string) {
        if (await gamesDb.findByName(name)) {
            throw new Error('این اتاق وجود دارد. لطفا نام دیگری وارد کنید');
        }
        return gamesDb.insertObject(name, new Gamebuilder(name).build().GetState());
    }
}
function makeListOfGames(gamesDb) {
    return async function () {
        return await gamesDb.findAll();
    }
}
function makeRebuildGame(gamesDb) {
    return async function (name) {
        const game_data = await findWithError(name, gamesDb)
        const parsed_game_data = JSON.parse(game_data);
        return new Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
    }
}
function makeFindGame(gamesDb) {
    return async function (gameName: string) {
        const game = await gamesDb.findByName(gameName);
        if (game) {
            return game;
        }
        throw new Error("Game did not found");
    }
}
function makeAddPlayerToGame(gamesDb) {
    return async function (gameName, socket_id, name) {
        const game_data = await findWithError(gameName, gamesDb);
        const parsed_game_data = JSON.parse(game_data);
        const game = new Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
        const add_player_result = game.game_players.addPlayer(socket_id, name);
        gamesDb.insertObject(gameName, game.GetState())
        return { game, add_player_result }
    }
}
function makePlayCard(gamesDb) {
    return async function (card, name, gameName) {
        const game_data = await findWithError(gameName, gamesDb);
        const parsed_game_data = JSON.parse(game_data);
        const game = new Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
        const result = game.table.playCard(card, name);
        return { game, result };
    }
}
function makeHokm(gamesDb) {
    return async function (suit, name, gameName) {
        const game_data = await findWithError(gameName, gamesDb);
        const parsed_game_data = JSON.parse(game_data);
        const game = new Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
        game.table.hokm(suit, name);
        return game;
    }
}
export {
    addPlayer,
    makeAddGame,
    makeRebuildGame,
    makeListOfGames,
    makeFindGame,
    makePlayCard,
    makeHokm,
    makeAddPlayerToGame
}