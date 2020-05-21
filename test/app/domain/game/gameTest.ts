import { Game } from './../../../../app/domain/game/game'
const expect = require('chai').expect
const sinon = require('sinon')
const setHighest = require('./../../../app/engine/setHighest')
const shuffle = require('./../../../app/engine/shuffle')

describe('Game shuffle cards', function () {
  it('should instantiate cards object and shuffle it and assign it to game shuffled_cards property', function () {})
})

describe('Game set Hakem', function () {
  it('should set hakem based on the dealed card when hakem is not defined and game has not previous winner', function () {
    var object = new Game()
    object.addPlayer(null, 'amir', function () {})
    object.addPlayer(null, 'ali', function () {})
    object.addPlayer(null, 'erfan', function () {})
    object.addPlayer(null, 'narges', function () {})
    object.hakem = undefined
    var stub = sinon.stub(shuffle, 'shuffle')
    stub.onCall(0).returns([
      [13, 'del'],
      [11, 'pik'],
      [2, 'khesht'],
    ])
    object.setHakem()
    expect(object.hakem).to.be.equal('erfan')
    stub.onCall(1).returns([
      [11, 'del'],
      [13, 'pik'],
      [2, 'khesht'],
    ])
    object.hakem = undefined
    object.setHakem()
    expect(object.hakem).to.be.equal('ali')
    stub.restore()
  })
})
describe('setWinnerOfBazi', function () {
  it('should take deck of cards an increment wonBazi of winner team in deck;', function () {
    var object = new Game()
    object.addPlayer(null, 'amir', function () {})
    object.addPlayer(null, 'ali', function () {})
    object.addPlayer(null, 'erfan', function () {})
    object.addPlayer(null, 'narges', function () {})
    var stub = sinon.stub(setHighest, 'setHighest')
    stub.onCall(0).returns([12, 'khaj', 'amir'])
    stub.onCall(1).returns([11, 'khaj', 'ali'])
    object.setWinnerOfBazi()
    expect(object.teams[0].won_bazi).to.be.equal(1)
    object.setWinnerOfBazi()
    expect(object.teams[1].won_bazi).to.be.equal(1)
  })
})

describe('setWinnerOfDast', function () {
  it('should take the team which has won 7 sets of bazi and make it the winner of dast', function () {
    var object = new Game()
    object.addPlayer(null, 'amir', function () {})
    object.addPlayer(null, 'ali', function () {})
    object.addPlayer(null, 'erfan', function () {})
    object.addPlayer(null, 'narges', function () {})
    object.hakem = 'ali'
    var object_winner_team = {
      players: ['ali', 'amir'],
      won_bazi: 7,
      won_dast: 0,
    }
    object.setWinnerOfDast(object_winner_team)
    expect(object_winner_team.won_dast).to.be.equal(1)
  })
})
