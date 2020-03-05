const Game = require('../engine/game');
// Games array that holds list of all instantiated games.
const games = [];

function getGames() {
    var gamesjson = JSON.stringify(games);
    return gamesjson;
}

function addGame(game) {
    var newGame = new Game(game);
    games.push(newGame);
}

module.exports = {
    getGames,
    addGame
}


