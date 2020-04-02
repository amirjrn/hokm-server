import { addGame } from "../models/games.js";
const findGame = require('../models/games').findGame;
function ioEvents(io) {
    io.on('connection', function (socket) {

        socket.on('create-room', function (gameName) {
            addGame(gameName, function (err, result) {
                if (err) {
                    socket.emit('err', 'Room name already created . Try another name')
                }
                else if (result === (gameName + "created")) {
                    io.emit('new-game', gameName);
                }
            });

        })
        socket.on('join-game', function (gameName, name) {
            var game_obj = findGame(gameName);
            game_obj.addPlayer(socket.id, name, function (error, result) {
                if (error) {
                    socket.emit('err', error)
                }
                else if (result === "ok") {
                    game_obj.players.map(player => io.to(player.socket_id).emit('new-user', name));
                }
                else if (result === "start game") {
                    game_obj.shuffled_cards.dealed_deck.map((card, i) => io.to(game_obj.players[(i % 4)].socket_id).emit("hokm_card", card));
                    game_obj.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game_obj.hakem));
                    game_obj.startGame();
                    game_obj.players.map(player => io.to(player.socket_id).emit("cards", player.cards))
                }
            });

        });
        socket.on('hokm', function (gameName, suit, name) {
            var game_obj = findGame(gameName);
            game_obj.hokm(suit, name);
            game_obj.players.map(player => io.to(player.socket_id).emit('hokm', game_obj.currentHokm));


        })
        socket.on('sendcard', function (card, name, gameName) {
            var game_obj = findGame(gameName);
            game_obj.playCard(card, name, function (err, result, winner) {
                if (err) {
                    game_obj.players.map(player => io.to(player.socket_id).emit('err', err))
                }
                else if (result === "ok") {
                    game_obj.players.map(player => io.to(player.socket_id).emit('card_played', card));
                }
                if (winner) {
                    game_obj.players.map(player => io.to(player.socket_id).emit('winner_bazi', winner))
                }
                io.to(game_obj.players[game_obj.playerTurn].socket_id).emit("your_turn", true);
            });


        });
        //add dissconnection event listener to every socket connected 
        socket.on('disconnect', function (socket) {
            // console.log("`${socket.id}` disconected");
            // var game_playing_object = Object.keys(games.games).find(game => game.players.hasOwnproperty(socket.id));
            // var game_playing_name = game_playing_name[nameOfGame];
            // io.to(game_playing_name).broadcast.emit('user-disconnected', game_playing_object[socket.id]);
            // games.games[]
        });
    });
}

module.exports = ioEvents;
export { }