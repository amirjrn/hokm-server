import { Gamebuilder } from '../../../../app/domain/game/Game'
import { expect } from 'chai'

describe('Game addplayer method', function () {
  it('Takes player name(session) and socket-id and add it to players list as an object', function () {
    var game = new Gamebuilder('game').setGamePlayers().build()
    game.game_players.addPlayer('sss12', 'ali')
    expect(game.game_players._players[0].socket_id).to.be.equal('sss12')
    expect(game.game_players._players[0].name).to.be.equal('ali')
  })
})

describe('Game addplayer method', function () {
  it('Takes player name(session) and socket-id and throw error if connected players are equal to four ', function () {
    var game = new Gamebuilder('game')
      .setRoomStatus({ players_connected: 4, status: 'Game Started' })
      .build()
    expect(game.game_players.addPlayer('sdf12', 'reza')).to.throw
  })
})

// describe('Game addDisconnectedplayer method', function () {
//   it('Takes player name(session) and socket-id and add socket id to the array item if finds passed name in it', function () {
//     var game = new Gamebuilder('game')
//       .setGamePlayers({ players: [{ socket_id: null, name: 'amir' }] })
//       .build()
//     game.game_players.addDisconnectedPlayer({ socket_id: 12 }, 'amir')
//     expect(game.game_players.players).to.be.eql([
//       { socket_id: 12, name: 'amir' },
//     ])
//   })
// })

// describe('Game addDisconnectedplayer method', function () {
//   it('Takes player name(session) and socket-id and countinue if item has already a socket id assigned', function () {
//     var game = new Gamebuilder('game')
//       .setGamePlayers({ players: [{ socket_id: '1sdf', name: 'ali' }] })
//       .build()

//     game.game_players.addDisconnectedPlayer({ socket_id: '1sd' }, 'ali')
//     expect(game.game_players.players).to.be.eql([
//       { socket_id: '1sdf', name: 'ali' },
//     ])
//   })
// })
