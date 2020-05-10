"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../use-cases/index");
const palyers_1 = require("../use-cases/palyers");
const checkStartGame_1 = require("./helpers/checkStartGame");
const checkWinner_1 = require("./helpers/checkWinner");
function sendName(socket) {
    return async ({ name, callback }) => {
        const add_player_result = await palyers_1.addPlayer(name, socket.id);
        !(add_player_result instanceof Error) ? callback(false, "ok") : callback(add_player_result.message, false);
    };
}
exports.sendName = sendName;
function reqListOfGames(socket) {
    return async () => {
        const list_of_games = await index_1.listOfGames();
        socket.emit("listOfGames", list_of_games);
    };
}
exports.reqListOfGames = reqListOfGames;
function createRoom(socket, io) {
    return async function (gameName) {
        await index_1.addGame(gameName);
        io.emit('new-game', gameName);
    };
}
exports.createRoom = createRoom;
function joinGame(socket, io) {
    return async (gameName, name) => {
        const { game, add_player_result } = await index_1.addPlayerToGame(gameName, socket.id, name);
        const other_players = game.game_players.players.filter(player => player.socket_id !== socket.id);
        other_players.map(player => socket.emit("prev-players", player.name));
        other_players.map(player => io.to(player.socket_id).emit('new-user', name));
        checkStartGame_1.default(add_player_result, game, io);
    };
}
exports.joinGame = joinGame;
function hokm(socket, io) {
    return async function (suit, name, gameName) {
        const game = await index_1.hokm(suit, name, gameName);
        game.game_players.players.map(player => io.to(player.socket_id).emit('hokm', game.table.currentHokm));
    };
}
exports.hokm = hokm;
function sendCard(socket, io) {
    return async function (cardNumber, cardSuit, name, gameName) {
        var card = [Number(cardNumber), cardSuit];
        const { game, result } = await index_1.playCard(card, name, gameName);
        socket.emit("remove-card", card);
        game.game_players.players.map(player => io.to(player.socket_id).emit('card-played', card, name));
        checkWinner_1.default(result, game, io);
    };
}
exports.sendCard = sendCard;
function playerDisconnected(socket) {
    return function () {
        palyers_1.removePlayer(socket.id);
    };
}
exports.playerDisconnected = playerDisconnected;
