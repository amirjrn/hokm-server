const expect = require('chai').expect;
const sortCards = require('./../../../app/engine/sortCards').sortCards;
describe('SortCards', function () {
    it('should take an array of cards as argument and return the highest card', function () {
        var array = [[10, "khaj"], [6, "khaj"], [12, "khaj"]];
        var Deck = sortCards(array);
        expect(Deck).to.be.eql([[12, "khaj"], [10, "khaj"], [6, "khaj"]]);
    })
});