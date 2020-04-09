import { addGame, findGame, listOfGames } from "../models/games.js";
import { addPlayer, removePlayer, disconnectPlayer } from "../models/palyers";
function ioEvents(io) {
    io.on('connection', function (socket) {

        socket.on("sendName", function (name) {
            addPlayer(name, socket.id, function (err) {
                if (err) {
                    socket.emit('result', err)
                }
                else {
                    socket.emit('result', "ok")
                }
            })
        });
        socket.on("reqListOfGames", function () {
            socket.emit("listOfGames", listOfGames());
        });
        socket.on('create-room', function (gameName: string) {
            addGame(gameName, function (err, result) {
                if (err) {
                    socket.emit('err', 'Room name already created . Try another name')
                }
                else {
                    io.emit('new-game', gameName);
                }
            });

        })
        socket.on('join-game', function (gameName, name) {
            console.log(gameName, name);
            findGame(gameName, function (err, game_obj) {
                if (err) {
                    socket.emit("err", err)
                }
                else {
                    game_obj.addPlayer(socket.id, name, function (error, result) {
                        if (error) {
                            socket.emit('err', error)
                        }
                        else {
                            var other_players = game_obj.players.filter(player => player.socket_id !== socket.id);
                            other_players.map(player => socket.emit("prev-players", player.name));
                            other_players.map(player => io.to(player.socket_id).emit('new-user', name));
                        }
                        if (result === "start game") {
                            game_obj.shuffled_cards.dealed_deck.map((card, i) => io.to(game_obj.players[(i % 4)].socket_id).emit("hokm-card", card));
                            game_obj.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game_obj.hakem));
                            game_obj.startGame();
                            game_obj.players.map(player => io.to(player.socket_id).emit("cards", player.cards))
                        }
                    });
                }
            });


        });
        socket.on('hokm', function (suit, name, gameName) {
            findGame(gameName, function (err, game_obj) {
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
            findGame(gameName, function (err, game_obj) {
                if (err) {
                    socket.emit("err", err);
                }
                else {
                    var card = [Number(cardNumber), cardSuit];
                    game_obj.playCard(card, name, function (err, result, winner) {
                        if (err) {
                            socket.emit("err", err);
                        }
                        else if (result === "ok" && !winner) {
                            game_obj.players.map(player => io.to(player.socket_id).emit('card-played', card));
                        }
                        else if (result === "ok" && winner) {
                            game_obj.players.map(player => io.to(player.socket_id).emit('card-played', card));
                            game_obj.players.map(player => io.to(player.socket_id).emit('winner-bazi', winner))
                        }
                        if (!err) {
                            socket.emit("your_turn", false);
                            io.to(game_obj.players[game_obj.playerTurn].socket_id).emit("your_turn", true);
                        }
                    });
                }

            });



        });
        //add dissconnection event listener to every socket connected 
        socket.on('disconnect', function () {

        });
    });
}

module.exports = ioEvents;
export { }