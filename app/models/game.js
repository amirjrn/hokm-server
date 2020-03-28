const Cards = require('./cards');
const findFirstَََAce = require('../engine/findFirstace');
const setHighest = require('../engine/setHighest');
const checkFull = require('../engine/checkFull');
const turn = require('./../engine/spreadTurn')
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
        this.teams =
            [
                { players: [this.players[0], this.players[2]], won_dast: 0, won_bazi: 0 },
                { players: [this.players[1], this.players[3]], won_dast: 0, won_bazi: 0 }
            ];
        this.status = "waiting for players";
        this.fullness = false;
    }
    addPlayer(socket, name) {
        if (checkFull(this.players_connected) && this.status === "Game Started") {
            throw new Error('Whoops!')
        }
        else if (!checkFull(this.players_connected) && this.status === "Game Started") {
            this.addDisconnectedPlayer(socket, name);
            if (this.players_connected === 4) {
                this.continueGame();
            }
        }
        else {
            this.players.push({ name, socket_id: socket })
            this.players_connected++;
            if (this.players_connected === 4) {
                this.startGame();
            }
        }
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
        this.setHakem();
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
        if (this.hakem === undefined) {
            this.shuffled_cards.shuffle();
            this.hakemIndex = findFirstَََAce(this.shuffled_cards);
            this.hakem = this.players[this.hakemIndex];
            console.log(this.hakemIndex)
        }
        else {
            if (!(winnerTeam.players.includes(this.hakem))) {
                this.hakem = this.hakem === 3 ? 0 : ++this.hakem;
            }
        }
        this.setPlayerTurn(this.hakem);
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
        this.players[turn(this.hakemIndex)].cards = this.shuffled_cards.deck.slice(0, 13);
        this.players[turn(this.hakemIndex, 1)].cards = this.shuffled_cards.deck.slice(13, 26);
        this.players[turn(this.hakemIndex, 2)].cards = this.shuffled_cards.deck.slice(26, 39);
        this.players[turn(this.hakemIndex, 3)].cards = this.shuffled_cards.deck.slice(39, 52);
    }


    orderPlayers() {

    }
    playCard(card) {
        this.deck.push(card);
        if (this.deck.length === 4) {
            this.setWinnerOfBazi();
        }
        else {
            this.setPlayerTurn();
        }
    }
    setWinnerOfBazi() {
        var highest = setHighest.setHighest(this.deck, this.hokm, this.currentCard);
        var winnerPlayer = this.players.find(player => player.sessionId === highest[2]);
        this.setPlayerTurn(winnerPlayer);
        var winnerTeam = this.teams.find((team) => team.players.includes(winnerPlayer));
        winnerTeam.won_bazi++;
        if (winnerTeam.won_bazi === 7) {
            this.setWinnerOfDast(winnerTeam);
        }
        return highest;
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