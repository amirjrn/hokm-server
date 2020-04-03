const expect = require('chai').expect;
var setHighest = require('./../../../app/engine/setHighest').setHighest;

describe('setHighest in normal mode', function () {
    it('should return highest card in a deck', function () {
        var highest = setHighest([[4, "khesht", 1], [4, "khesht", 2], [10, "khesht", 3], [12, "khesht", 3], [3, "khesht", 1]], "del", "khesht");
        expect(highest).to.be.eql([12, "khesht", 3]);
    })
});
describe('setHighest in cut mode', function () {
    it('should return highest card in a deck', function () {
        var highest = setHighest([[4, "khesht", 1], [4, "khesht", 2], [10, "del", 3], [12, "del", 3], [3, "khesht", 1]], "del", "khesht");
        expect(highest).to.be.eql([12, "del", 3]);
    })
});
describe('setHighest in pass mode', function () {
    it('should return highest card in a deck', function () {
        var highest = setHighest([[4, "khesht", 1], [5, "khesht", 2], [10, "del", 3], [12, "del", 3], [3, "khesht", 1]], "pik", "khesht");
        expect(highest).to.be.eql([5, "khesht", 2]);
    })
});