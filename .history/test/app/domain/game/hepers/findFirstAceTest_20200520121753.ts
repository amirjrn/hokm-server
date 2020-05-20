import { Deck } from './../../../../../app/domain/game/cards'
const expect = require('chai').expect
var sinon = require('sinon')
var findFirstace = require('./../../../app/engine/findFirstace').findFirstَََAce
describe('FindfirstAce', function () {
  it('should take deck of cards an return player index who has the first ace', function () {
    var cards = new Cards()
    var stub = sinon.stub(cards, 'deal')
    stub.onCall(0).returns([12, 'dell'])
    stub.onCall(1).returns([13, 'khesht'])
    var first = findFirstace(cards)
    expect(first).to.be.equal(1)
  })
})
