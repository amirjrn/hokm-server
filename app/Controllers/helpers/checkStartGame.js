"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkStartGame(result, game, io) {
    if (result === "start game") {
        game.cards.dealed_deck.map((card, i) => io.to(game.game_players.players[(i % 4)].socket_id).emit("hokm-card", card));
        game.game_players.players.map(player => io.to(player.socket_id).emit("taeen-hakem", game.game_players.hakem));
        game.game_players.players.map(player => io.to(player.socket_id).emit("teams", game.game_players.teams));
        setTimeout(() => {
            game.game_players.players.map(player => io.to(player.socket_id).emit("cards", player.cards));
        }, 2000);
    }
}
exports.default = checkStartGame;
