const Game = require('./../../../app/models/game').Game;
const expect = require('chai').expect;
const sinon = require('sinon');
const setHighest = require('./../../../app/engine/setHighest')
const shuffle = require('./../../../app/engine/shuffle');
describe('Game addplayer method', function () {
    it('Takes player name(session) and socket-id and add it to players list as an object', function () {
        var object = new Game();
        object.addPlayer(12, 'ali', function (err, result) {
            expect(err).to.be.null;
        });
        expect(object.players[0].socket_id).to.be.equal(12);
        expect(object.players[0].name).to.be.equal('ali');
    })
});
describe('Game addplayer method', function () {
    it('Takes player name(session) and socket-id and throw error if connected players are equal to four ', function () {
        var object = new Game();
        object.players_connected = 4;
        object.status = "Game Started";
        object.addPlayer(12, 'reza', function (err, result) {
            expect(err).to.not.be.null;
        });
    })
});
describe('Game addDisconnectedplayer method', function () {
    it('Takes player name(session) and socket-id and add socket id to the array item if finds passed name in it', function () {
        var object = new Game();
        object.players = [{ socket_id: null, name: 'amir' }];
        object.addDisconnectedPlayer({ socket_id: 12 }, 'amir')
        expect(object.players).to.be.eql([{ socket_id: 12, name: 'amir' }]);
    })
});
describe('Game addDisconnectedplayer method', function () {
    it('Takes player name(session) and socket-id and countinue if item has already a socket id assigned', function () {
        var object = new Game();
        object.players = [{ socket_id: 12, name: 'ali' }];
        object.addDisconnectedPlayer({ socket_id: 4 }, 'ali')
        expect(object.players).to.be.eql([{ socket_id: 12, name: 'ali' }]);
    })
});

describe('Game shuffle cards', function () {
    it('should instantiate cards object and shuffle it and assign it to game shuffled_cards property', function () {

    })
});

describe('Game set Hakem', function () {
    it('should set hakem based on the dealed card when hakem is not defined and game has not previous winner', function () {
        var object = new Game();
        object.addPlayer(null, "amir", function () { })
        object.addPlayer(null, "ali", function () { })
        object.addPlayer(null, "erfan", function () { })
        object.addPlayer(null, "narges", function () { })
        object.hakem = undefined;
        var stub = sinon.stub(shuffle, "shuffle");
        stub.onCall(0).returns([[13, "del"], [11, "pik"], [2, "khesht"]]);
        object.setHakem();
        expect(object.hakem).to.be.equal("erfan");
        stub.onCall(1).returns([[11, "del"], [13, "pik"], [2, "khesht"]]);
        object.hakem = undefined;
        object.setHakem();
        expect(object.hakem).to.be.equal("ali")
        stub.restore();
    })
});
describe('setWinnerOfBazi', function () {
    it('should take deck of cards an increment wonBazi of winner team in deck;', function () {
        var object = new Game();
        object.addPlayer(null, "amir", function () { })
        object.addPlayer(null, "ali", function () { })
        object.addPlayer(null, "erfan", function () { })
        object.addPlayer(null, "narges", function () { })
        var stub = sinon.stub(setHighest, "setHighest");
        stub.onCall(0).returns([12, "khaj", "amir"]);
        stub.onCall(1).returns([11, "khaj", "ali"]);
        object.setWinnerOfBazi();
        expect(object.teams[0].won_bazi).to.be.equal(1);
        object.setWinnerOfBazi();
        expect(object.teams[1].won_bazi).to.be.equal(1);
    })
});
describe('Game set hokm', function () {
    it('should set hakem based on the dealed card', function () {
        var object = new Game();
        object.hakem = "ali";
        object.hokm("khaj", "ali", function (err) {
            expect(err).to.be.null;
        });
        expect(object.currentHokm).to.be.equal("khaj");
    })
});
describe('Game set hokm', function () {
    it('should return error if hakem name is not equal to hokm emitter name', function () {
        var object = new Game();
        object.hakem = "ali";
        object.hokm("khaj", "amir", function (err) {
            expect(err).to.not.be.null;
        });
        expect(object.currentHokm).to.not.be.equal("khaj");
    })
});


describe('setWinnerOfDast', function () {
    it('should take the team which has won 7 sets of bazi and make it the winner of dast', function () {
        var object = new Game();
        var object_winner_team = { won_bazi: 7, won_dast: 0 };
        object.setWinnerOfDast(object_winner_team);
        expect(object_winner_team.won_dast).to.be.equal(1);
    })
});

describe('Play Card', function () {
    it('should return error if player has a currentCard suit and plays an other suit', function () {
        var object = new Game();
        object.currentCard = 'del'
        object.playerTurn = 0;
        object.players[0] = { name: "amir", cards: [[3, 'del'], [4, 'pik']] }
        object.playCard([4, 'pik'], "amir", function (err) {
            expect(err).to.not.be.null;
        })
    })
});
describe('Play Card', function () {
    it('should return error if player has a currentCard suit and plays an other suit', function () {
        var object = new Game();
        object.currentCard = undefined;
        object.playerTurn = 0;
        object.players[0] = { name: "amir", cards: [[3, 'del'], [4, 'pik']] }
        object.playCard([4, 'pik'], "amir", function (err, result) {
            expect(err).to.be.null;
            expect(result).to.be.equal("ok");
            expect(object.currentCard).to.be.equal("pik")
            expect(object.deck[0]).to.be.eql([4, "pik", "amir"])
        })
    })
});