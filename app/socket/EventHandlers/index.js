"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const games_js_1 = require("../../models/games.js");
const palyers_1 = require("../../models/palyers");
function sendName(socket) {
    return (name, callback) => {
        const add_player_result = palyers_1.addPlayer(name, socket.id);
        !(add_player_result instanceof Error) ? callback(false, "ok") : callback(add_player_result.message, false);
    };
}
exports.sendName = sendName;
function reqListOfGames(socket) {
    return () => {
        socket.emit("listOfGames", games_js_1.listOfGames());
    };
}
exports.reqListOfGames = reqListOfGames;
function createRoom(socket, io) {
    return function (gameName) {
        games_js_1.addGame(gameName, function (err, result) {
            if (err) {
                socket.emit('err', 'Room name already created . Try another name');
            }
            else {
                io.emit('new-game', gameName);
            }
        });
    };
}
exports.createRoom = createRoom;
function joinGame(socket, io) {
    return (gameName, name) => {
        games_js_1.findGame(gameName, function (err, game_obj) {
            if (err) {
                socket.emit("err", err);
            }
            else {
                game_obj.game_players.addPlayer(socket.id, name, function (error, result) {
                    if (error) {
                        socket.emit('err', error);
                    }
                    else {
                        var other_players = game_obj.game_players.players.filter(player => player.socket_id !== socket.id);
                        console.log(other_players);
                        other_players.map(player => socket.emit("prev-players", player.name));
                        other_players.map(player => io.to(player.socket_id).emit('new-user', name));
                    }
                    if (result === "start game") {
                        game_obj.table.cards.dealed_deck.map((card, i) => io.to(game_obj.game_players.players[(i % 4)].socket_id).emit("hokm-card", card));
                        game_obj.game_players.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game_obj.game_players.hakem));
                        io.to(game_obj.game_players.players[game_obj.game_players.playerTurn].socket_id).emit('your_turn', true);
                        game_obj.game_players.players.map(player => io.to(player.socket_id).emit("teams", game_obj.game_players.teams));
                        setTimeout(() => {
                            game_obj.game_players.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
                        }, 2000);
                    }
                });
            }
        });
    };
}
exports.joinGame = joinGame;
function hokm(socket, io) {
    return function (suit, name, gameName) {
        games_js_1.findGame(gameName, function (err, game_obj) {
            if (err) {
                socket.emit("err", err);
            }
            else {
                game_obj.table.hokm(suit, name, function (err) {
                    if (err) {
                        socket.emit("err", err);
                    }
                    else {
                        game_obj.game_players.players.map(player => io.to(player.socket_id).emit('hokm', game_obj.currentHokm));
                        io.to(game_obj.game_players.players[game_obj.game_players.playerTurn].socket_id).emit('your_turn', true);
                    }
                });
            }
        });
    };
}
exports.hokm = hokm;
function sendCard(socket, io) {
    return function (cardNumber, cardSuit, name, gameName, callback) {
        games_js_1.findGame(gameName, function (err, game_obj) {
            if (err) {
                return socket.emit("err", err);
            }
            var card = [Number(cardNumber), cardSuit];
            const result = game_obj.table.playCard(card, name);
            if (result instanceof Error) {
                socket.emit("err", result.message);
                return callback(result.message, null);
            }
            socket.emit("your_turn", false);
            socket.emit("remove-card", card);
            io.to(game_obj.game_players.players[game_obj.game_players.playerTurn].socket_id).emit("your_turn", true);
            game_obj.game_players.players.map(player => io.to(player.socket_id).emit('card-played', card, name));
            if (result) {
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit('winner-bazi', result[0]));
            }
            if (result && result[1]) {
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit("teams", game_obj.game_players.teams));
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit("hokm", null));
                setTimeout(() => {
                    game_obj.game_players.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
                    game_obj.game_players.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game_obj.table.hakem));
                }, 1000);
                io.to(game_obj.game_players.players[game_obj.game_players.playerTurn].socket_id).emit("your_turn", true);
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
