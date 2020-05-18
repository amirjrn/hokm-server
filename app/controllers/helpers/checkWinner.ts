import IGame from '../../domain/game/interfaces/IGame'
export default function (result, game, io) {
  if (result) {
    game.game_players.players.map((player) =>
      io.to(player.socket_id).emit('winner-bazi', result[0])
    )
  }
  if (result && result[1]) {
    game.game_players.players.map((player) =>
      io.to(player.socket_id).emit('teams', game.game_players.teams)
    )
    game.game_players.players.map((player) =>
      io.to(player.socket_id).emit('hokm', null)
    )
    setTimeout(() => {
      game.game_players.players.map((player) =>
        io.to(player.socket_id).emit('cards', player.cards)
      )
      game.game_players.players.map((player) =>
        io.to(player.socket_id).emit('taeen-hakem', game.game_players.hakem)
      )
    }, 1000)
  }
}
