"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playCard = exports.sendHokm = exports.addPlayerToGame = exports.listOfGames = exports.findGame = exports.addGame = void 0;
const index_1 = require("./../data-access/index");
const games_js_1 = require("./games.js");
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
