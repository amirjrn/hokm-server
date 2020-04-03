var Cards = require('./../../../app/models/cards').Deck;
const expect = require('chai').expect;
var sinon = require('sinon');
var findFirstace = require('./../../../app/engine/findFirstace').findFirstَََAce;
describe('FindfirstAce', function () {
    it('should take deck of cards an return player index who has the first ace', function () {
        var object = new Cards();
        var stub = sinon.stub(object, "deal");
        stub.onCall(0).returns([12, 'dell']);
        stub.onCall(1).returns([13, 'khesht']);
        var first = findFirstace(object);
        expect(first).to.be.equal(1);
    })
});