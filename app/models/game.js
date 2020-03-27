const Cards = require('./cards');
const findFirstَََAce = require('../engine/findFirstace');
const setHighest = require('../engine/setHighest');
const checkFull = require('../engine/checkFull');
class Game {
    constructor(name) {
        this.nameOfGame = name;
        this.shuffled_cards = this.shuffle();
        this.deck = [];
        this.players_connected = 0;
        this.hakem;
        this.currentCard;
        this.playerTurn;
        this.players =
            [
                { sessionId: 1, socket_id: 12, name: "amir" },
                { sessionId: 2, socket_id: 12, name: "ali" },
                { sessionId: 3, socket_id: 13, name: "erfan" },
                { sessionId: 4, socket_id: 14, name: "narges" }
            ];
        this.teams =
            [
                { players: [this.players[0], this.players[2]], won_dast: 0, won_bazi: 0 },
                { players: [this.players[1], this.players[3]], won_dast: 0, won_bazi: 0 }
            ];
        this.status = "waiting for players";
        this.fullness = false;
    }
    shuffle() {
        this.shuffled_cards = new Cards();
    }
    setHakem(winnerTeam) {
        if (this.hakem === undefined) {
            this.shuffled_cards.shuffle();
            this.hakem = findFirstَََAce(this.shuffled_cards);
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
    startGame() {
        this.setHakem();
        this.shuffle();
        this.shuffled_cards.shuffle();
        this.spreadCards();
        this.status = "Game Started";
    }
    spreadCards() {
        this.players[this.hakem].cards = this.shuffled_cards.slice(0, 13);
        this.players[this.hakem + 1].cards = this.shuffled_cards.slice(13, 26);
        this.players[this.hakem + 2].cards = this.shuffled_cards.slice(26, 39);
        this.players[this.hakem + 3].cards = this.shuffled_cards.slice(39, 52);
    }
    addPlayer(socket, name) {
        if (checkFull(this.players_connected)) {
            throw new Error('Whoops!')
        }
        else {
            if (this.players.length !== 0) {
                this.addDisconnectedPlayer(socket, name);
            }
            this.players.push({ name, socket_id: socket.socket_id })
            this.players_connected++;
        }
    }
    addDisconnectedPlayer(socket, name) {
        for (let player of this.players) {
            if (player.hasOwnProperty('socket_id') && player.socket_id !== null) {
                continue;
            }
            else if (player.name === name) {
                player.socket_id = socket.socket_id;
                this.players_connected++;
                return;
            }
        }
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

exports.Game = Game; 