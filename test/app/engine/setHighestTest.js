const expect = require('chai').expect;
var setHighest = require('./../../../app/engine/setHighest').setHighest;

describe('setHighest', function () {
    it('should return highest card in a deck', function () {
        var highest = setHighest([[13, "khesht"], [4, "khesht"], [10, "khesht"], [12, "khesht"], [3, "khesht"]], "dell", "khesht");
        expect(highest).to.be.eql([13, "khesht"]);
    })
});