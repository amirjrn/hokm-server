const Cards = require('./../../../app/models/cards');
const expect = require('chai').expect;
describe('Cards', function () {
    it('should be instance of Deck', function () {
        var object = new Cards();
        expect(object).to.be.an.instanceof(Cards);
    })
});
describe('Cards deal', function () {
    it('should return the last card in the deck', function () {
        var cards = new Cards();
        var last_card = cards.deal();
        expect(last_card).to.be.eql([13, 'khesht']);
    })
});