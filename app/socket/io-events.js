const games = require('../engine/games').games;
const addGame = require('../engine/games').addGame;
const checkStatus = require('./helper/checkStatus');

function ioEvents(io) {
    io.on('connection', function (socket) {
        socket.on('create-room', function (gameName) {
            addGame(gameName);
            console.log(games);
        })
        socket.on('join-game', function (gameName, name) {
            var game_obj = games.find(game => game.nameOfGame === gameName);
            game_obj.addPlayer(socket, name);
            game_obj.palyers.map(player => io.to(player.socket_id).emit('new-user', name));
            checkStatus(game_obj, io);
        });
        socket.on('hokm', function (gameName, suit, name) {
            var game_obj = games.find(game => game.nameOfGame === gameName);
            if (game_obj.hakem === name) {
                game_obj.hokm = suit;
                game_obj.palyers.map(player => io.to(player.socket_id).emit('hokm', game_obj.hokm));
            }
        })
        socket.on('sendcard', function (name, gameName, card) {
            var game_obj = games.find(game => game.nameOfGame === gameName);
            game_obj.playCard(card, name);
            game_obj.palyers.map(player => io.to(player.socket_id).emit('cardplayed', game_obj.deck))

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