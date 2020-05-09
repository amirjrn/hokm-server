"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../domain/game");
const palyers_1 = require("./palyers");
exports.addPlayer = palyers_1.addPlayer;
function makeAddGame(gamesDb) {
    return async function (name) {
        if (await gamesDb.findByName(name)) {
            throw new Error('Room name already created . Try another name');
        }
        return gamesDb.insertObject(name, new game_1.Gamebuilder(name).build().GetState());
    };
}
exports.makeAddGame = makeAddGame;
function removeGame(name) {
    delete games[name];
}
function makeListOfGames(gamesDb) {
    return async function () {
        return await gamesDb.findAll();
    };
}
exports.makeListOfGames = makeListOfGames;
function makeRebuildGame(gamesDb) {
    return async function (name) {
        const game_data = await gamesDb.findByName(name);
        if (game_data) {
            const parsed_game_data = JSON.parse(game_data);
            return new game_1.Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
        }
        throw new Error("Game did not found");
    };
}
exports.makeRebuildGame = makeRebuildGame;
function makeFindGame(gamesDb) {
    return async function (gameName) {
        const game = await gamesDb.findByName(gameName);
        if (game) {
            return game;
        }
        return new Error("Game did not found");
    };
}
exports.makeFindGame = makeFindGame;
function makeAddPlayerToGame(gamesDb) {
    return async function (gameName, socket_id, name) {
        const game_data = await gamesDb.findByName(gameName);
        const parsed_game_data = JSON.parse(game_data);
        const game = new game_1.Gamebuilder(parsed_game_data.name).reBuild(parsed_game_data).build();
        const add_player_result = game.game_players.addPlayer(socket_id, name);
        gamesDb.insertObject(gameName, game.GetState());
        return { game, add_player_result };
    };
}
exports.makeAddPlayerToGame = makeAddPlayerToGame;
