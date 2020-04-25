
import { setHighest } from '../engine/setHighest';
import { moveCard } from '../engine/moveCard';
import { GamePlayers } from './gamePlayers';
import { Deck as Cards } from './cards'
class Table {
    GamePlayers: GamePlayers;
    cards: Cards;
    deck: Array<any>;
    currentHokm: string;
    currentCard: string;
    constructor(players, cards, roomstatus) {
        this.GamePlayers = players;
        this.cards = cards;
        this.deck = [];
        this.currentHokm;
        this.currentCard;
    }
    hokm(suit, name, done) {

        if (this.GamePlayers.hakem !== name) {
            done("you are not hakem");
        }
        else {
            this.currentHokm = suit;
            done(null)
        }
    }
    finishBazi() {
        this.currentCard = null;
        this.deck = [];
    }
    playCard(card, name: string, done: Function) {
        var player = this.GamePlayers.players.find(player => player.name === name);
        if (!player) {
            return new Error("you can not send card to this room")
        }
        if (this.GamePlayers.players[this.GamePlayers.playerTurn].name !== name) {
            return new Error("it is not your turn");
        }
        if (!player.cards.find(playerCard => playerCard[0] === card[0] && playerCard[1] === card[1])) {
            return new Error("you don't have this card");
        }
        if (this.currentCard && player.cards.find(playerCard => playerCard[1] === this.currentCard) && this.currentCard !== card[1]) {
            return new Error("please play current card")
        }
        const has_winner = this.moveCard(card, player);
        return has_winner
    }

    moveCard(card, player) {
        moveCard(this, card, player);
        if (this.deck.length === 4) {
            return this.setWinnerOfBazi();
        }
        if (this.currentCard) {
            this.GamePlayers.setPlayerTurn();
            return null
        }
        if (!this.currentCard) {
            this.GamePlayers.setPlayerTurn();
            this.currentCard = card[1];
            return null
        }
    }
    setWinnerOfBazi() {
        var highest = setHighest(this.deck, this.currentHokm, this.currentCard);
        var winnerPlayer = highest[2];
        var winnerTeam = this.GamePlayers.teams.find(team => team.players.find(player => player === winnerPlayer));
        var winnnerPlayerIndex = this.GamePlayers.players.map(e => e.name).indexOf(winnerPlayer);
        winnerTeam.won_bazi++;
        this.GamePlayers.setPlayerTurn(winnnerPlayerIndex);
        this.finishBazi();
        if (winnerTeam.won_bazi === 7) {
            this.setWinnerOfDast(winnerTeam);
            // returns winner player an true if bazi is finished
            return [winnerPlayer, true]
        }
        // return winner player and false if bazi is not finished
        return [winnerPlayer, false];
    }
    setWinnerOfDast(winnerTeam) {
        this.GamePlayers.teams = this.GamePlayers.teams.map((team) => Object.assign(team, { won_bazi: 0 }));
        winnerTeam.won_dast++;
        this.GamePlayers.setHakem(winnerTeam);
        this.GamePlayers.spreadCards();
        if (winnerTeam.won_dast === 7) {
            this.setWinnerOfGame(winnerTeam);
        }
    }
    setWinnerOfGame(winnerTeam) {

    }
}

export { Table }