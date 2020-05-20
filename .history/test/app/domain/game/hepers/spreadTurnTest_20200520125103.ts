import { turn } from '../../../../../app/domain/game/helpers/spreadTurn'
import { expect } from 'chai'

describe('spreadTurn', function () {
  it('it should increment previous number if less than four and return 0 in case of number 4', function () {
    const playerTurn = turn(2, 1)
    expect(playerTurn).to.be.equal(4)
  })
})
