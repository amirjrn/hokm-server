import { Cards } from '../../../../../app/domain/game/Cards'
import { expect } from 'chai'
import { stub } from 'sinon'
import { findFirstَََAce } from '../../../../../app/domain/game/helpers/findFirstace'
describe('FindfirstAce', function () {
  it('should take deck of cards an return player index who has the first ace', function () {
    var cards = new Cards()
    var stubCards = stub(cards, 'deal')
    stubCards.onCall(0).returns([12, 'dell'])
    stubCards.onCall(1).returns([13, 'khesht'])
    var first = findFirstَََAce(cards)
    expect(first).to.be.equal(1)
  })
})
