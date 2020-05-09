"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../use-cases/index");
const palyers_1 = require("../use-cases/palyers");
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
        if (add_player_result === "start game") {
            game.cards.dealed_deck.map((card, i) => io.to(game.game_players.players[(i % 4)].socket_id).emit("hokm-card", card));
            game.game_players.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game.game_players.hakem));
            game.game_players.players.map(player => io.to(player.socket_id).emit("teams", game.game_players.teams));
            setTimeout(() => {
                game.game_players.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
            }, 2000);
        }
    };
}
exports.joinGame = joinGame;
function hokm(socket, io) {
    return function (suit, name, gameName) {
        index_1.findGame(gameName, function (err, game_obj) {
            if (err) {
                socket.emit("err", err);
            }
            else {
                game_obj.table.hokm(suit, name, function (err) {
                    if (err) {
                        socket.emit("err", err);
                    }
                    else {
                        game_obj.game_players.players.map(player => io.to(player.socket_id).emit('hokm', game_obj.table.currentHokm));
                    }
                });
            }
        });
    };
}
exports.hokm = hokm;
function sendCard(socket, io) {
    return function (cardNumber, cardSuit, name, gameName, callback) {
        index_1.findGame(gameName, function (err, game_obj) {
            if (err) {
                return socket.emit("err", err);
            }
            var card = [Number(cardNumber), cardSuit];
            const result = game_obj.table.playCard(card, name);
            if (result instanceof Error) {
                socket.emit("err", result.message);
                return callback(result.message, null);
            }
            socket.emit("remove-card", card);
            game_obj.game_players.players.map(player => io.to(player.socket_id).emit('card-played', card, name));
            if (result) {
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit('winner-bazi', result[0]));
            }
            if (result && result[1]) {
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit("teams", game_obj.game_players.teams));
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit("hokm", null));
                setTimeout(() => {
                    game_obj.game_players.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
                    game_obj.game_players.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game_obj.game_players.hakem));
                }, 1000);
            }
        });
    };
}
exports.sendCard = sendCard;
function playerDisconnected(socket) {
    return function () {
        palyers_1.removePlayer(socket.id);
    };
}
exports.playerDisconnected = playerDisconnected;
