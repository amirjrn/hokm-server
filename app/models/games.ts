import { Game } from './game'

var games: Array<Game> = [];

function addGame(name: string, done: Function) {
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
    return games.map(game => game.nameOfGame);

}
function findGame(name: string, done: Function) {
    var game = games.find(game => game.nameOfGame === name);
    if (game) {
        done(null, game);


    }
    else {
        done("Game did Not Found");
    }
}
export {
    games,
    addGame,
    removeGame,
    listOfGames,
    findGame
}