import { Gamebuilder } from './../../../../app/domain/game/game'
import { expect } from 'chai'

describe('Game set hokm', function () {
  it('should set hakem based on the dealed card', function () {
    var game = new Gamebuilder('name').setGamePlayers({ hakem: 'ali' }).build()
    game.table.hokm('khaj', 'ali')
    expect(game.table.currentHokm).to.be.equal('khaj')
  })
})

describe('Game set hokm', function () {
  it('should return error if hakem name is not equal to hokm emitter name', function () {
    var object = new Game()
    object.hakem = 'ali'
    object.hokm('khaj', 'amir', function (err) {
      expect(err).to.not.be.null
    })
    expect(object.currentHokm).to.not.be.equal('khaj')
  })
})

describe('Play Card', function () {
  it('should return error if player has a currentCard suit and plays an other suit', function () {
    var object = new Game()
    object.currentCard = 'del'
    object.playerTurn = 0
    object.players[0] = {
      name: 'amir',
      cards: [
        [3, 'del'],
        [4, 'pik'],
      ],
    }
    object.playCard([4, 'pik'], 'amir', function (err) {
      expect(err).to.not.be.null
    })
  })
})

describe('Play Card', function () {
  it('should return error if player has a currentCard suit and plays an other suit', function () {
    var object = new Game()
    object.currentCard = undefined
    object.playerTurn = 0
    object.players[0] = {
      name: 'amir',
      cards: [
        [3, 'del'],
        [4, 'pik'],
      ],
    }
    object.playCard([4, 'pik'], 'amir', function (err, result) {
      expect(err).to.be.null
      expect(result).to.be.equal('ok')
      expect(object.currentCard).to.be.equal('pik')
      expect(object.deck[0]).to.be.eql([4, 'pik', 'amir'])
    })
  })
})
