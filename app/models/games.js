const Game = require('./game');

var games = [];

function addGame(name) {
    games.push(new Game(name));
}
function removeGame(name) {
    delete games[name];
}
function listOfGames() {
    if (games.length === 0) {
        return "No Game to play. try to add new game";
    }
    var gameList = games.map(game => (
        {
            name: game.nameOfGame,
            numberOfPlayer: game.numberOfPlayer
        }
    ));
    return gameList;
}
exports = {
    games,
    addGame,
    removeGame,
    listOfGames
}