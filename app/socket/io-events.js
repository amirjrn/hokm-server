"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const games_js_1 = require("../models/games.js");
const palyers_1 = require("../models/palyers");
function ioEvents(io) {
    io.on('connection', function (socket) {
        socket.on("sendName", function (name) {
            palyers_1.addPlayer(name, socket.id, function (err) {
                if (err) {
                    socket.emit('result', err);
                }
                else {
                    socket.emit('result', "ok");
                }
            });
        });
        socket.on("reqListOfGames", function () {
            socket.emit("listOfGames", games_js_1.listOfGames());
        });
        socket.on('create-room', function (gameName) {
            games_js_1.addGame(gameName, function (err, result) {
                if (err) {
                    socket.emit('err', 'Room name already created . Try another name');
                }
                else {
                    io.emit('new-game', gameName);
                }
            });
        });
        socket.on('join-game', function (gameName, name) {
            games_js_1.findGame(gameName, function (err, game_obj) {
                if (err) {
                    socket.emit("err", err);
                }
                else {
                    game_obj.addPlayer(socket.id, name, function (error, result) {
                        if (error) {
                            socket.emit('err', error);
                        }
                        else {
                            var other_players = game_obj.players.filter(player => player.socket_id !== socket.id);
                            console.log(other_players);
                            other_players.map(player => socket.emit("prev-players", player.name));
                            other_players.map(player => io.to(player.socket_id).emit('new-user', name));
                        }
                        if (result === "start game") {
                            game_obj.shuffled_cards.dealed_deck.map((card, i) => io.to(game_obj.players[(i % 4)].socket_id).emit("hokm-card", card));
                            game_obj.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game_obj.hakem));
                            game_obj.players.map(player => io.to(player.socket_id).emit("teams", game_obj.teams));
                            setTimeout(() => {
                                game_obj.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
                            }, 2000);
                        }
                    });
                }
            });
        });
        socket.on('hokm', function (suit, name, gameName) {
            games_js_1.findGame(gameName, function (err, game_obj) {
                if (err) {
                    socket.emit("err", err);
                }
                else {
                    game_obj.hokm(suit, name, function (err) {
                        if (err) {
                            socket.emit("err", err);
                        }
                        else {
                            game_obj.players.map(player => io.to(player.socket_id).emit('hokm', game_obj.currentHokm));
                            io.to(game_obj.players[game_obj.playerTurn].socket_id).emit('your_turn', true);
                        }
                    });
                }
            });
        });
        socket.on('sendcard', function (cardNumber, cardSuit, name, gameName) {
            games_js_1.findGame(gameName, function (err, game_obj) {
                if (err) {
                    socket.emit("err", err);
                }
                else {
                    var card = [Number(cardNumber), cardSuit];
                    game_obj.playCard(card, name, function (err, result, winner) {
                        if (err) {
                            socket.emit("err", err);
                        }
                        else {
                            socket.emit("your_turn", false);
                            socket.emit("remove-card", card);
                            io.to(game_obj.players[game_obj.playerTurn].socket_id).emit("your_turn", true);
                        }
                        if (!err && result === "ok") {
                            game_obj.players.map(player => io.to(player.socket_id).emit('card-played', card, name));
                        }
                        if (!err && result === "ok" && winner) {
                            game_obj.players.map(player => io.to(player.socket_id).emit('winner-bazi', winner));
                        }
                    });
                }
            });
        });
        //add dissconnection event listener to every socket connected 
        socket.on('disconnect', function () {
            palyers_1.removePlayer(socket.id);
        });
    });
}
module.exports = ioEvents;
