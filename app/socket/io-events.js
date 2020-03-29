const addGame = require('../models/games').addGame;
const findGame = require('../models/games').findGame;

function ioEvents(io) {
    io.on('connection', function (socket) {

        socket.on('create-room', function (gameName) {
            addGame(gameName, function (err, result) {
                if (err) {
                    socket.emit('err', 'room name already created . try an other name')
                }
                else if (result === (gameName + "created")) {
                    io.emit('new-game', gameName);
                }
            });

        })
        socket.on('join-game', function (gameName, name) {
            var game_obj = findGame(gameName);
            game_obj.addPlayer(socket.id, name, io, function (error, result) {
                if (error) {
                    socket.emit('err', error)
                }
                else if (result === "ok") {
                    game_obj.players.map(player => io.to(player.socket_id).emit('new-user', name));
                    if (game_obj.players_connected === 4) {
                        game_obj.players.map(player => io.to(player.socket_id).emit("set_cards", player.cards))
                    }
                }
            });

        });
        socket.on('hokm', function (gameName, suit, name) {
            var game_obj = findGame(gameName);
            game_obj.hokm(suit, name);
            game_obj.players.map(player => io.to(player.socket_id).emit('hokm', game_obj.currentHokm));
        })
        socket.on('sendcard', function (name, gameName, card) {
            var game_obj = findGame(gameName);
            game_obj.playCard(card, name);
            game_obj.palyers.map(player => io.to(player.socket_id).emit('card_played', card))

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