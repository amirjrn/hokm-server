import IGame from '../../domain/game/interfaces/IGame'
export default function (result, game, io) {
  if (result) {
    game.game_players.players.map((player) => io.to(player.socket_id).emit('winnerBazi', result[0]))
  }
  if (result && result[1]) {
    // Will update the number of won bazi
    game.game_players.players.map((player) => io.to(player.socket_id).emit('teams', game.game_players.teams))
    //sets hokm to null and wait for the hakem to send new hokm
    game.game_players.players.map((player) => io.to(player.socket_id).emit('hokm', null))
    setTimeout(() => {
      game.game_players.players.map((player) => io.to(player.socket_id).emit('cards', player.cards))
      game.game_players.players.map((player) =>
        io.to(player.socket_id).emit('taeenHakem', game.game_players.hakem)
      )
    }, 1000)
  }
}
