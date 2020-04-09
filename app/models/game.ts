import { Deck as Cards } from './cards';
import { findFirstَََAce } from '../engine/findFirstace';
import { setHighest } from '../engine/setHighest';
import { checkFull } from '../engine/checkFull';
import { moveCard } from '../engine/moveCard';
import { turn } from '../engine/spreadTurn';
import { sortCards } from '../engine/sortCards';
import { Player } from './player';
class Game {
    nameOfGame: string;
    shuffled_cards: Cards;
    deck: Array<any>;
    players_connected: number;
    hakem: Player;
    hakemIndex: number;
    currentHokm: string;
    currentCard: string;
    playerTurn: number;
    players: Array<any>;
    teams: Array<any>;
    status: string;
    fullness: boolean;
    constructor(name: string) {
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
        this.players.map(player => player.socket_id = player.socket_id === socket ? null : player.socket_id)
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
        this.status === "Stopped";
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
            if (!(winnerTeam.players.find(player => player.name === this.hakem.name))) {
                this.hakemIndex = this.hakemIndex === 3 ? 0 : ++this.hakemIndex;
            }
        }
        // Every time hakem is changed , it's hakem turn to play.
        this.setPlayerTurn(this.hakemIndex);
    }
    hokm(suit, name, done) {
        if (this.hakem !== name) {
            done("you are not hakem")
        }
        else {
            this.currentHokm = suit;
        }
    }
    //There are three situations where players turn changes : 
    // 1-hakem is set : always hakem is the player to play;
    // 2-card is played : the next player after one who has played card ;
    // 3-winner Of bazi has been choosen : the player who has played the highest card ;
    setPlayerTurn(hakemOrWinner: number = undefined) {
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
    finishBazi() {
        this.currentCard = null;
        this.deck = [];
    }
    playCard(card, name: string, done: Function) {
        var player = this.players.find(player => player.name === name);
        console.log(player.cards.length);
        if (!player) {
            return done("you can not send card to this room ")
        }
        if (this.players[this.playerTurn].name !== name) {
            return done("it is not your turn");
        }
        if (!player.cards.find(playerCard => playerCard[0] === card[0] && playerCard[1] === card[1])) {
            return done("you don't have this card");
        }
        if (this.currentCard && card[1] !== this.currentCard && card[1] !== this.currentHokm) {
            return done("please play hokm or current card")
        }
        if (this.deck.length === 3) {
            moveCard(this, card, player);
            var winner_of_bazi = this.setWinnerOfBazi();
            done(null, "ok", winner_of_bazi);
        }
        else if (this.currentCard) {
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
        console.log(player.cards.length);
        console.log(player.cards)
    }
    setWinnerOfBazi() {
        var highest = setHighest(this.deck, this.currentHokm, this.currentCard);
        var winnerPlayer = highest[2];
        var winnerTeam = this.teams.find(team => team.players.find(player => player.name === winnerPlayer));
        var winnnerPlayerIndex = this.players.map(e => e.name).indexOf(winnerPlayer);
        winnerTeam.won_bazi++;
        this.setPlayerTurn(winnnerPlayerIndex);
        this.finishBazi();
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