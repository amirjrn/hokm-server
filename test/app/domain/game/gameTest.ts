import { Gamebuilder } from '../../../../app/domain/game/Game'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as setHighest from './../../../../app/domain/game/helpers/setHighest'
import * as shuffle from './../../../../app/domain/game/helpers/shuffle'
import IOnlinePlayer from '../../../../app/domain/game/interfaces/IOnlinePlayer'
describe('Game shuffle cards', function () {
  it('should instantiate cards object and shuffle it and assign it to game shuffled_cards property', function () {})
})

describe('setWinnerOfBazi', function () {
  it('should take deck of cards an increment wonBazi of winner team in deck;', function () {
    var game = new Gamebuilder('game').build()
    game.game_players.addPlayer('s1', 'amir', 'd1')
    game.game_players.addPlayer('s12', 'ali', 'd12')
    game.game_players.addPlayer('s123', 'erfan', 'd123')
    game.game_players.addPlayer('s1234', 'narges', 'd1234')
    game.game_players.initTeams()
    var stub = sinon.stub(setHighest, 'setHighest')
    stub.onCall(0).returns([12, 'khaj', 'd1'])
    stub.onCall(1).returns([11, 'khaj', 'd12'])
    game.table.setWinnerOfBazi()
    expect(game.game_players.teams[0].won_bazi).to.be.equal(1)
    game.table.setWinnerOfBazi()
    expect(game.game_players.teams[1].won_bazi).to.be.equal(1)
  })
})

describe('setWinnerOfDast', function () {
  it('should take the team which has won 7 sets of bazi and make it the winner of dast', function () {
    var game = new Gamebuilder('game').setRoomStatus({ hakem: 'd1', hakemIndex: 0 }).build()
    game.game_players.addPlayer('s1', 'amir', 'd1')
    game.game_players.addPlayer('s12', 'ali', 'd12')
    game.game_players.addPlayer('s123', 'erfan', 'd123')
    game.game_players.addPlayer('s1234', 'narges', 'd1234')
    console.log(game.game_players.players)
    game.game_players.initTeams()
    game.table.setWinnerOfDast(game.game_players.teams[0])
    expect(game.game_players.teams[0].won_dast).to.be.equal(1)
  })
})
