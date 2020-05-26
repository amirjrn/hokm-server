import { Gamebuilder } from '../../../../app/domain/game/Game'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as shuffle from './../../../../app/domain/game/helpers/shuffle'

describe('Game set Hakem', function () {
  it('should set hakem based on the dealed card when hakem is not defined and game has not previous winner', function () {
    var game = new Gamebuilder('f').build()
    var stub = sinon.stub(shuffle, 'shuffle')
    stub.onCall(0).returns([
      [12, 'del'],
      [13, 'pik'],
      [2, 'khesht'],
    ])
    game.game_players.addPlayer('sss1', 'amir', 'd1')
    game.game_players.addPlayer('sss12', 'ali', 'd2')
    game.game_players.addPlayer('sss123', 'erfan', 'd3')
    game.game_players.addPlayer('sss1234', 'narges', 'd4')
    game.game_players.initTeams()
    game.room_status.setHakem(null, game.game_players.players)
    expect(game.room_status.hakem).to.be.equal('d2')
  })
})
