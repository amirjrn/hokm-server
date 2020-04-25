"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_1 = require("./cards");
const findFirstace_1 = require("../engine/findFirstace");
const setHighest_1 = require("../engine/setHighest");
const moveCard_1 = require("../engine/moveCard");
class Table {
    constructor(players) {
        this.GamePlayers = players;
        this.cards = new cards_1.Deck();
        this.deck = [];
        this.hakem;
        this.hakemIndex;
        this.currentHokm;
        this.currentCard;
        this.playerTurn;
        this.status = "waiting for players";
    }
    startGame() {
        this.setHakem(null);
        this.status = "Game Started";
    }
    stopGame() {
        this.status === "Stopped";
    }
    continueGame() {
        this.status === "Game Started";
    }
    setHakem(winnerTeam) {
        // if it is the first game , the game has no winner so hakem should be set randomly.
        if (!winnerTeam && this.hakem === undefined) {
            this.cards.shuffle();
            this.hakemIndex = findFirstace_1.findFirstَََAce(this.cards);
            this.hakem = this.GamePlayers.players[this.hakemIndex].name;
        }
        // if previuos hakem is in winner team , hakem should not be changed . Otherwise hakem should be next player;
        else {
            if (!(winnerTeam.players.find(player => player === this.hakem))) {
                this.hakemIndex = this.hakemIndex === 3 ? 0 : ++this.hakemIndex;
                this.hakem = this.GamePlayers.players[this.hakemIndex].name;
            }
        }
        // Every time hakem is changed , it's hakem turn to play.
        this.setPlayerTurn(this.hakemIndex);
    }
    hokm(suit, name, done) {
        if (this.hakem !== name) {
            done("you are not hakem");
        }
        else {
            this.currentHokm = suit;
            done(null);
        }
    }
    //There are three situations where players turn changes : 
    // 1-hakem is set : always hakem is the player to play;
    // 2-card is played : the next player after one who has played card ;
    // 3-winner Of bazi has been choosen : the player who has played the highest card ;
    setPlayerTurn(hakemOrWinner = undefined) {
        if (hakemOrWinner !== undefined) {
            this.playerTurn = hakemOrWinner;
        }
        else {
            this.playerTurn = this.playerTurn === 3 ? 0 : ++this.playerTurn;
        }
    }
    finishBazi() {
        this.currentCard = null;
        this.deck = [];
    }
    playCard(card, name, done) {
        var player = this.GamePlayers.players.find(player => player.name === name);
        if (!player) {
            return new Error("you can not send card to this room");
        }
        if (this.GamePlayers.players[this.playerTurn].name !== name) {
            return new Error("it is not your turn");
        }
        if (!player.cards.find(playerCard => playerCard[0] === card[0] && playerCard[1] === card[1])) {
            return new Error("you don't have this card");
        }
        if (this.currentCard && player.cards.find(playerCard => playerCard[1] === this.currentCard) && this.currentCard !== card[1]) {
            return new Error("please play current card");
        }
        const has_winner = this.moveCard(card, player);
        return has_winner;
    }
    moveCard(card, player) {
        moveCard_1.moveCard(this, card, player);
        if (this.deck.length === 4) {
            return this.setWinnerOfBazi();
        }
        if (this.currentCard) {
            this.setPlayerTurn();
            return null;
        }
        if (!this.currentCard) {
            this.setPlayerTurn();
            this.currentCard = card[1];
            return null;
        }
    }
    setWinnerOfBazi() {
        var highest = setHighest_1.setHighest(this.deck, this.currentHokm, this.currentCard);
        var winnerPlayer = highest[2];
        var winnerTeam = this.GamePlayers.teams.find(team => team.players.find(player => player === winnerPlayer));
        var winnnerPlayerIndex = this.GamePlayers.players.map(e => e.name).indexOf(winnerPlayer);
        winnerTeam.won_bazi++;
        this.setPlayerTurn(winnnerPlayerIndex);
        this.finishBazi();
        if (winnerTeam.won_bazi === 7) {
            this.setWinnerOfDast(winnerTeam);
            // returns winner player an true if bazi is finished
            return [winnerPlayer, true];
        }
        // return winner player and false if bazi is not finished
        return [winnerPlayer, false];
    }
    setWinnerOfDast(winnerTeam) {
        this.GamePlayers.teams = this.GamePlayers.teams.map((team) => Object.assign(team, { won_bazi: 0 }));
        winnerTeam.won_dast++;
        this.setHakem(winnerTeam);
        this.GamePlayers.spreadCards();
        if (winnerTeam.won_dast === 7) {
            this.setWinnerOfGame(winnerTeam);
        }
    }
    setWinnerOfGame(winnerTeam) {
    }
}
exports.Table = Table;
