const Game = require('./game');

var games = [];

function addGame(name, done) {
    if (games.some(game => game.nameOfGame === name)) {
        done('room alreay created')
    }
    else {
        games.push(new Game(name));
        done(null, name + "created")
    }

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
function findGame(name) {
    return games.find(game => game.nameOfGame === name)
}
module.exports = {
    games,
    addGame,
    removeGame,
    listOfGames,
    findGame
}