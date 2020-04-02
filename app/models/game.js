const Cards = require('./cards');
const findFirstَََAce = require('../engine/findFirstace');
const setHighest = require('../engine/setHighest');
const checkFull = require('../engine/checkFull');
const moveCard = require('../engine/moveCard');
const turn = require('../engine/spreadTurn')
class Game {
    constructor(name) {
        this.nameOfGame = name;
        this.shuffled_cards = new Cards();
        this.deck = [];
        this.players_connected = 0;
        this.hakem;
        this.hakemIndex;
        this.currentHokm;
        this.currentCard;
        this.playerTurn;
        this.players = [];
        this.teams = [];
        this.status = "waiting for players";
        this.fullness = false;
    }
    addPlayer(socket, name, done) {
        if (checkFull(this.players_connected) && this.status === "Game Started") {
            if (done !== undefined) {
                return done('Game is full')
            }
        }
        else if (!checkFull(this.players_connected) && this.status === "Game Started") {
            this.addDisconnectedPlayer(socket, name);
            if (this.players_connected === 4) {
                this.continueGame();
            }
        }
        else {
            this.players.push({ name, socket_id: socket });
            this.players_connected++;
            if (this.players_connected === 4) {
                this.setTeams();
                this.setHakem(null);
                if (done !== undefined) {
                    done(null, "start game")
                }
            }
            else {
                if (done !== undefined) {
                    done(null, "ok")
                }
            }
        }
    }
    setTeams() {
        this.teams = [
            { players: [this.players[0], this.players[2]], won_dast: 0, won_bazi: 0 },
            { players: [this.players[1], this.players[3]], won_dast: 0, won_bazi: 0 }
        ];
    }
    removePlayer(socket) {
        this.players.filter(player => player.socket_id !== socket);
        this.stopGame();
    }
    disconnectPlayer(socket) {
        this.player.map(player => player.socket_id = player.socket_id === socket ? null : player.socket_id)
        this.stopGame();
    }
    addDisconnectedPlayer(socket, name) {
        for (let player of this.players) {
            if (player.hasOwnProperty('socket_id') && player.socket_id === null) {
                if (player.name === name) {
                    player.socket_id = socket.socket_id;
                    this.players_connected++;
                    return;
                }
            }
        }
    }
    startGame() {
        this.shuffled_cards = new Cards();
        this.shuffled_cards.shuffle();
        this.spreadCards();
        this.status = "Game Started";
    }
    stopGame() {
        this.staus === "Stopped";
    }
    continueGame() {
        this.status === "Game Started"
    }
    setHakem(winnerTeam) {
        // if it is the first game , the game has no winner so hakem should be set randomly.
        if (this.hakem === undefined) {
            this.shuffled_cards.shuffle();
            this.hakemIndex = findFirstَََAce(this.shuffled_cards);
            this.hakem = this.players[this.hakemIndex].name;

        }
        // if previuos hakem is in winner team , hakem should not be changed . Otherwise hakem should be next player;
        else {
            if (!(winnerTeam.players.find(player => player.name === hakem))) {
                this.hakem = this.hakem === 3 ? 0 : ++this.hakem;
            }
        }
        // Every time hakem is changed , it's hakem turn to play.
        this.setPlayerTurn(this.hakem);
    }
    hokm(suit, name) {
        if (this.hakem === name) {
            this.currentHokm = suit;
        }
    }
    //There are three situations where players turn changes : 
    // 1-hakem is set : always hakem is the player to play;
    // 2-card is played : the next player after one who has played card ;
    // 3-winner Of bazi has been choosen : the player who has played the highest card ;
    setPlayerTurn(hakemOrWinner) {
        if (hakemOrWinner !== undefined) {
            this.playerTurn = hakemOrWinner;
        }
        else {
            this.playerTurn = this.playerTurn === 3 ? 0 : ++this.playerTurn;
        }
    }

    spreadCards() {
        this.players[turn(this.hakemIndex, 0)].cards = this.shuffled_cards.deck.slice(0, 13);
        this.players[turn(this.hakemIndex, 1)].cards = this.shuffled_cards.deck.slice(13, 26);
        this.players[turn(this.hakemIndex, 2)].cards = this.shuffled_cards.deck.slice(26, 39);
        this.players[turn(this.hakemIndex, 3)].cards = this.shuffled_cards.deck.slice(39, 52);
    }


    orderPlayers() {

    }
    playCard(card, name, done) {
        var player = game.players.find(player => player.name === name);
        if (this.playerTurn === name) {
            return done("it is not your turn");
        }
        if (!player.cards.includes(card)) {
            return done("you don't have this card");
        }

        if (card[1] === this.currentCard || card[1] === this.currentHokm & this.deck.length === 3) {
            moveCard(this, card, player);
            var winner_of_bazi = this.setWinnerOfBazi();
            this.currentCard = null;
            done(null, "ok", winner_of_bazi);
        }
        else if (card[1] === this.currentCard || card[1] === this.currentHokm) {
            moveCard(this, card, player);
            this.setPlayerTurn();
            done(null, "ok")
        }
        else if (!this.currentCard) {
            moveCard(this, card, player);
            this.setPlayerTurn();
            this.currentCard = card[1];
            done(null, "ok")
        }
        else {
            done("please play current card or hokm")
        }
    }
    setWinnerOfBazi() {
        var highest = setHighest.setHighest(this.deck, this.hokm, this.currentCard);
        var winnerPlayer = highest[2];
        this.setPlayerTurn(winnerPlayer);
        var winnerTeam = this.teams.find(team => team.players.find(player => player.name === highest[2]));
        winnerTeam.won_bazi++;
        if (winnerTeam.won_bazi === 7) {
            this.setWinnerOfDast(winnerTeam);
        }
        return highest[2];
    }
    setWinnerOfDast(winnerTeam) {
        this.teams.forEach((team) => team.won_bazi = 0);
        winnerTeam.won_dast++;
        if (winnerTeam.won_dast === 7) {
            this.setWinnerOfGame(winnerTeam);
        }
    }
    setWinnerOfGame(winnerTeam) {

    }
}

module.exports = Game; 