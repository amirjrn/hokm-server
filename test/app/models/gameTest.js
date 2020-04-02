const game = require('./../../../app/models/game');
const expect = require('chai').expect;
const sinon = require('sinon');
const Cards = require('./../../../app/models/cards');
const checkFull = require('./../../../app/engine/checkFull');
const sortCards = require('./../../../app/engine/sortCards');
const setHighest = require('./../../../app/engine/setHighest')

describe('Game addplayer method', function () {
    it('Takes player name(session) and socket-id and add it to players list as an object', function () {
        var object = new game();
        object.addPlayer(12, 'ali', function (err, result) {
            expect(err).to.be.null;
        });
        expect(object.players[0].socket_id).to.be.equal(12);
        expect(object.players[0].name).to.be.equal('ali');
    })
});
describe('Game addplayer method', function () {
    it('Takes player name(session) and socket-id and throw error if connected players are equal to four ', function () {
        var object = new game();
        object.players_connected = 4;
        object.status = "Game Started";
        object.addPlayer(12, 'reza', function (err, result) {
            expect(err).to.not.be.null;
        });
    })
});
describe('Game addDisconnectedplayer method', function () {
    it('Takes player name(session) and socket-id and add socket id to the array item if finds passed name in it', function () {
        var object = new game();
        object.players = [{ socket_id: null, name: 'amir' }];
        object.addDisconnectedPlayer({ socket_id: 12 }, 'amir')
        expect(object.players).to.be.eql([{ socket_id: 12, name: 'amir' }]);
    })
});
describe('Game addDisconnectedplayer method', function () {
    it('Takes player name(session) and socket-id and countinue if item has already a socket id assigned', function () {
        var object = new game();
        object.players = [{ socket_id: 12, name: 'ali' }];
        object.addDisconnectedPlayer({ socket_id: 4 }, 'ali')
        expect(object.players).to.be.eql([{ socket_id: 12, name: 'ali' }]);
    })
});

describe('Game shuffle cards', function () {
    it('should instantiate cards object and shuffle it and assign it to game shuffled_cards property', function () {
        var object = new game();
        expect(object.shuffled_cards.deal()).to.be.eql([13, "khesht"]);
    })
});
describe('Game set Hakem', function () {
    it('should set hakem based on the dealed card', function () {

    })
});
describe('Game set hokm', function () {
    it('should set hakem based on the dealed card', function () {
        var object = new game();
        object.hakem = "ali";
        object.hokm("khaj", "ali");
        expect(object.currentHokm).to.be.equal("khaj");
    })
});

describe('setWinnerOfBazi', function () {
    it('should take deck of cards an increment wonBazi of winner team in deck;', function () {
        var object = new game();
        object.addPlayer(null, "amir")
        object.addPlayer(null, "ali")
        object.addPlayer(null, "erfan")
        object.addPlayer(null, "narges")
        var stub = sinon.stub(setHighest, "setHighest");
        stub.onCall(0).returns([12, "khaj", "amir"]);
        stub.onCall(1).returns([11, "khaj", "ali"]);
        object.setWinnerOfBazi();
        expect(object.teams[0].won_bazi).to.be.equal(1);
        object.setWinnerOfBazi();
        expect(object.teams[0].won_bazi).to.be.equal(1);
    })
});
describe('setWinnerOfDast', function () {
    it('should take the team which has won 7 sets of bazi and make it the winner of dast', function () {
        var object = new game();
        var object_winner_team = { won_bazi: 7, won_dast: 0 };
        object.setWinnerOfDast(object_winner_team);
        expect(object_winner_team.won_dast).to.be.equal(1);
    })
});