import { checkFull } from '../../../../../app/domain/game/helpers/checkFull'
import { expect } from 'chai'

describe('checkfull', function () {
  it('should take 4 as argument and return true', function () {
    expect(checkFull(4)).to.be.true
  })
})
describe('checkfull', function () {
  it('should take 3 as argument and return false', function () {
    expect(checkFull(3)).to.be.false
  })
})
