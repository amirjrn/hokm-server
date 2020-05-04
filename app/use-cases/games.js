"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../domain/game");
var games = [];
exports.games = games;
function addGame(name, done) {
    if (games.some(game => game.nameOfGame === name)) {
        done('room alreay created');
    }
    else {
        games.push(new game_1.Game(name));
        done(null, name + "created");
    }
}
exports.addGame = addGame;
function removeGame(name) {
    delete games[name];
}
exports.removeGame = removeGame;
function listOfGames() {
    return games.map(game => game.nameOfGame);
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
