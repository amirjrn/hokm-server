import { addGame, findGame, listOfGames } from "../use-cases/games.js";
import { addPlayer, removePlayer, disconnectPlayer } from "../use-cases/palyers";
import { Game } from '../domain/game';
export function sendName(socket) {
    return (name, callback) => {
        const add_player_result = addPlayer(name, socket.id)
        !(add_player_result instanceof Error) ? callback(false, "ok") : callback(add_player_result.message, false)
    }
}
export function reqListOfGames(socket) {
    return () => {
        socket.emit("listOfGames", listOfGames());
    }
}
export function createRoom(socket, io) {
    return function (gameName: string) {
        addGame(gameName, function (err, result) {
            if (err) {
                socket.emit('err', 'Room name already created . Try another name')
            }
            else {
                io.emit('new-game', gameName);
            }
        });

    }
}
export function joinGame(socket, io) {
    return (gameName: string, name: string) => {
        findGame(gameName, function (err, game_obj: Game) {
            if (err) {
                socket.emit("err", err)
            }
            else {
                game_obj.game_players.addPlayer(socket.id, name, function (error, result) {
                    if (error) {
                        socket.emit('err', error)
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
                        game_obj.game_players.players.map(player => io.to(player.socket_id).emit("teams", game_obj.game_players.teams))
                        setTimeout(() => {
                            game_obj.game_players.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
                        }, 2000);

                    }
                });
            }
        });


    }
}
export function hokm(socket, io) {
    return function (suit, name, gameName) {
        findGame(gameName, function (err, game_obj: Game) {
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
    }
}
export function sendCard(socket, io) {
    return function (cardNumber, cardSuit, name, gameName, callback) {
        findGame(gameName, function (err, game_obj: Game) {
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
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit('winner-bazi', result[0]))
            }
            if (result && result[1]) {
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit("teams", game_obj.game_players.teams))
                game_obj.game_players.players.map(player => io.to(player.socket_id).emit("hokm", null));
                setTimeout(() => {
                    game_obj.game_players.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
                    game_obj.game_players.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game_obj.game_players.hakem));
                }, 1000);

            }
        });
    }
}
export function playerDisconnected(socket) {
    return function () {
        removePlayer(socket.id);
    }
}