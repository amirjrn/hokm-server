const Cards = require('./../../../app/models/cards').Deck;
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
        cards.shuffle();
        var last_card = cards.shuffled_deck[cards.shuffled_deck.length - 1];
        var dealed_card = cards.deal();
        expect(last_card).to.be.eql(dealed_card);
    })
});