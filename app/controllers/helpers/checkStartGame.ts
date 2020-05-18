// check to see if to start game every time a new player has joiend to game
export default function checkStartGame(result, game, io) {
  // if result is to start game then notify players
  if (result === 'start game') {
    game.cards.dealed_deck.map((card, i) =>
      io.to(game.game_players.players[i % 4].socket_id).emit('hokm-card', card)
    )
    game.game_players.players.map((player) =>
      io.to(player.socket_id).emit('taeen-hakem', game.game_players.hakem)
    )
    game.game_players.players.map((player) =>
      io.to(player.socket_id).emit('teams', game.game_players.teams)
    )
    setTimeout(() => {
      game.game_players.players.map((player) =>
        io.to(player.socket_id).emit('cards', player.cards)
      )
    }, 2000)
  }
}
