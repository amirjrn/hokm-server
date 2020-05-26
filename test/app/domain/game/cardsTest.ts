import { Cards } from '../../../../app/domain/game/Cards'
import { expect } from 'chai'

describe('Cards deal', function () {
  it('should return the last card in the deck', function () {
    let cards: Cards = new Cards()
    cards.shuffle()

    let first_card = cards.shuffled_deck[0]
    let dealed_card = cards.deal()
    expect(first_card).to.be.eql(dealed_card)
    dealed_card = cards.deal()
    let second_card = cards.shuffled_deck[1]
    expect(second_card).to.be.eql(dealed_card)
  })
})

describe('Cards reset', function () {
  it('should return the last card in the deck', function () {
    let cards: Cards = new Cards()
    cards.shuffle()
    cards.deal()
    cards.reset()
    expect(cards.dealed_deck).to.be.eql([])
    expect(cards.shuffled_deck).to.be.eql([])
  })
})
