"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game = require('./game');
var games = [];
exports.games = games;
function addGame(name, done) {
    if (games.some(game => game.nameOfGame === name)) {
        done('room alreay created');
    }
    else {
        games.push(new Game(name));
        done(null, name + "created");
    }
}
exports.addGame = addGame;
function removeGame(name) {
    delete games[name];
}
exports.removeGame = removeGame;
function listOfGames() {
    if (games.length === 0) {
        return "No Game to play. try to add new game";
    }
    var gameList = games.map(game => ({
        name: game.nameOfGame,
        numberOfPlayer: game.numberOfPlayer
    }));
    return gameList;
}
exports.listOfGames = listOfGames;
function findGame(name, done) {
    var game = games.find(game => game.nameOfGame === name);
    if (game) {
        done(null, game);
    }
    else {
        done("Game did Not Found");
    }
}
exports.findGame = findGame;
