import { Gamebuilder } from './../../../../app/domain/game/game'
import { expect } from 'chai'
describe('Game addplayer method', function () {
  it('Takes player name(session) and socket-id and add it to players list as an object', function () {
    var gamePlayers = new Gamebuilder('game').setGamePlayers().build()
    gamePlayers.game_players.addPlayer('sss12', 'ali')
    expect(gamePlayers.game_players.players[0].socket_id).to.be.equal('sss12')
    expect(gamePlayers.game_players.players[0].name).to.be.equal('ali')
  })
})
describe('Game addplayer method', function () {
  it('Takes player name(session) and socket-id and throw error if connected players are equal to four ', function () {
    var gamePlayers = new Gamebuilder('game')
      .setRoomStatus({ players_connected: 4 })
      .build()
    object.players_connected = 4
    object.status = 'Game Started'
    object.addPlayer(12, 'reza', function (err, result) {
      expect(err).to.not.be.null
    })
  })
})
describe('Game addDisconnectedplayer method', function () {
  it('Takes player name(session) and socket-id and add socket id to the array item if finds passed name in it', function () {
    var object = new Game()
    object.players = [{ socket_id: null, name: 'amir' }]
    object.addDisconnectedPlayer({ socket_id: 12 }, 'amir')
    expect(object.players).to.be.eql([{ socket_id: 12, name: 'amir' }])
  })
})
describe('Game addDisconnectedplayer method', function () {
  it('Takes player name(session) and socket-id and countinue if item has already a socket id assigned', function () {
    var object = new Game()
    object.players = [{ socket_id: 12, name: 'ali' }]
    object.addDisconnectedPlayer({ socket_id: 4 }, 'ali')
    expect(object.players).to.be.eql([{ socket_id: 12, name: 'ali' }])
  })
})
