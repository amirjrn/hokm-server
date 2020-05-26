import { sortCards } from '../../../../../app/domain/game/helpers/sortCards'
import { expect } from 'chai'
describe('SortCards', function () {
  it('should take an array of cards as argument and return the highest card', function () {
    var array = [
      [10, 'khaj'],
      [6, 'khaj'],
      [12, 'khaj'],
    ]
    var Deck = sortCards(array, false)
    expect(Deck).to.be.eql([
      [12, 'khaj'],
      [10, 'khaj'],
      [6, 'khaj'],
    ])
  })
})
