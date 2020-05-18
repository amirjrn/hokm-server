"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconnectPlayer = exports.disconnectPlayer = exports.removePlayer = exports.addPlayer = exports.playCard = exports.sendHokm = exports.addPlayerToGame = exports.listOfGames = exports.findGame = exports.addGame = void 0;
const index_1 = require("./../data-access/index");
const games_js_1 = require("./games.js");
const palyers_1 = require("./palyers");
// games use cases
const addGame = games_js_1.makeAddGame(index_1.gamesDb);
exports.addGame = addGame;
const findGame = games_js_1.makeFindGame(index_1.gamesDb);
exports.findGame = findGame;
const listOfGames = games_js_1.makeListOfGames(index_1.gamesDb);
exports.listOfGames = listOfGames;
const addPlayerToGame = games_js_1.makeAddPlayerToGame(index_1.gamesDb);
exports.addPlayerToGame = addPlayerToGame;
const sendHokm = games_js_1.makeHokm(index_1.gamesDb);
exports.sendHokm = sendHokm;
const playCard = games_js_1.makePlayCard(index_1.gamesDb);
exports.playCard = playCard;
// players use cases
const addPlayer = palyers_1.makeAddPlayer(index_1.playersDb);
exports.addPlayer = addPlayer;
const removePlayer = palyers_1.makeRemovePlayer(index_1.playersDb);
exports.removePlayer = removePlayer;
const disconnectPlayer = palyers_1.makeDisconnectPlayer(index_1.playersDb);
exports.disconnectPlayer = disconnectPlayer;
const reconnectPlayer = palyers_1.makeReconnectPlayer(index_1.playersDb);
exports.reconnectPlayer = reconnectPlayer;
