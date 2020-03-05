function checkStatus(game_obj, io) {
    if (game_obj.players.length === 4 && game_obj.status === "waiting to start") {
        game_obj.startGame();
        game_obj.palyers.map(player => io.to(player.socket_id).emit('game-started', player.cards.slice(0, 5), game_obj.hakem));
    }
    if (game_obj.players.length === 4 && game_obj.status === "started") {
        game_obj.continue();
        game_obj.palyers.map(player => io.to(player.socket_id).emit('countinue'));
    }
}
module.exports = checkStatus;