"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddPlayerToGame = exports.makeHokm = exports.makePlayCard = exports.makeFindGame = exports.makeListOfGames = exports.makeAddGame = exports.addPlayer = void 0;
const game_1 = require("../domain/game");
const palyers_1 = require("./palyers");
Object.defineProperty(exports, "addPlayer", { enumerable: true, get: function () { return palyers_1.addPlayer; } });
const findWithError_1 = require("./helpers/findWithError");
function makeListOfGames(gameDb) {
    return async function () {
        return await gameDb.findAll();
    };
}
exports.makeListOfGames = makeListOfGames;
function makeAddGame(gameDb) {
    return async function (name) {
        if (await gameDb.findByName(name)) {
            throw new Error('این اتاق وجود دارد. لطفا نام دیگری وارد کنید');
        }
        return gameDb.insertObject(name, new game_1.Gamebuilder(name).build().GetState());
    };
}
exports.makeAddGame = makeAddGame;
function makeFindGame(gameDb) {
    return async function (gameName) {
        const game = await gameDb.findByName(gameName);
        if (game) {
            return game;
        }
        throw new Error("Game did not found");
    };
}
exports.makeFindGame = makeFindGame;
function makeAddPlayerToGame(gameDb) {
    return async function (gameName, socket_id, name) {
        const game_data = await findWithError_1.default(gameName, gameDb);
        const game = new game_1.Gamebuilder(game_data.nameOfGame).reBuild(game_data).build();
        const add_player_result = game.game_players.addPlayer(socket_id, name);
        gameDb.insertObject(gameName, game.GetState());
        return { game, add_player_result };
    };
}
exports.makeAddPlayerToGame = makeAddPlayerToGame;
function makePlayCard(gameDb) {
    return async function (card, name, gameName) {
        const game_data = await findWithError_1.default(gameName, gameDb);
        const game = new game_1.Gamebuilder(game_data.nameOfGame).reBuild(game_data).build();
        const result = game.table.playCard(card, name);
        gameDb.insertObject(gameName, game.GetState());
        return { game, result };
    };
}
exports.makePlayCard = makePlayCard;
function makeHokm(gameDb) {
    return async function (suit, name, gameName) {
        const game_data = await findWithError_1.default(gameName, gameDb);
        const game = new game_1.Gamebuilder(game_data.nameOfGame).reBuild(game_data).build();
        game.table.hokm(suit, name);
        gameDb.insertObject(gameName, game.GetState());
        return game;
    };
}
exports.makeHokm = makeHokm;
