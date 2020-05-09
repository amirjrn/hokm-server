import { findFirstَََAce } from './helpers/findFirstace';
import { turn } from './helpers/spreadTurn';
import { Table } from './table';
import { Deck as Cards } from './cards';
import { RoomStatus } from './roomStatus';
class GamePlayers {
    room_status: RoomStatus;
    players: Array<any>;
    table: Table;
    hakem: string;
    hakemIndex: number;
    cards: Cards;
    teams: Array<any>;
    playerTurn: number;
    constructor({ cards, room_status, hakem, hakemIndex, players, teams, playerTurn }) {
        this.cards = cards;
        this.room_status = room_status;
        this.hakem = hakem;
        this.hakemIndex = hakemIndex;
        this.players = players;
        this.teams = teams;
        this.playerTurn = playerTurn;
    }
    addPlayer(socket_id: string, name: string) {
        if (this.room_status.players_connected >= 4) {
            throw new Error('Game is full')
        }
        // if (!checkFull(this.#players_connected)) {
        //     return this.addDisconnectedPlayer(socket_id, name);
        // }
        this.players.push({ name, socket_id: socket_id });
        this.room_status.players_connected++;
        if (this.room_status.players_connected === 4) {
            this.room_status.startGame();
            this.setHakem(null);
            this.setTeams();
            this.spreadCards();
            return "start game";
        }
        else {
            return "ok"
        }
    }
    setTeams() {
        this.teams = [
            { players: [this.players[0].name, this.players[2].name], won_dast: 0, won_bazi: 0 },
            { players: [this.players[1].name, this.players[3].name], won_dast: 0, won_bazi: 0 }
        ];
    }
    removePlayer(socket) {
        this.players.filter(player => player.socket_id !== socket);
        this.room_status.stopGame();
    }
    disconnectPlayer(socket) {
        this.players.map(player => player.socket_id = player.socket_id === socket ? null : player.socket_id)
        this.room_status.stopGame();
    }
    // addDisconnectedPlayer(socket, name) {
    //     for (let player of this.players) {
    //         if (player.hasOwnProperty('socket_id') && player.socket_id === null) {
    //             if (player.name === name) {
    //                 player.socket_id = socket.socket_id;
    //                 this.#players_connected++;
    //                 return;
    //             }
    //         }
    //     }
    //     if (this.#players_connected === 4) {
    //         this.table.continueGame();
    //     }
    // }
    setHakem(winnerTeam) {
        // if it is the first game , the game has no winner so hakem should be set randomly.
        if (!winnerTeam && this.hakem === undefined) {
            this.cards.shuffle();
            this.hakemIndex = findFirstَََAce(this.cards);
            this.hakem = this.players[this.hakemIndex].name;
        }
        // if previuos hakem is in winner team , hakem should not be changed . Otherwise hakem should be next player;
        else {
            if (!(winnerTeam.players.find(player => player === this.hakem))) {
                this.hakemIndex = this.hakemIndex === 3 ? 0 : ++this.hakemIndex;
                this.hakem = this.players[this.hakemIndex].name;
            }
        }
        // Every time hakem is changed , it's hakem turn to play.
        this.setPlayerTurn(this.hakemIndex);
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
        console.log(turn(this.hakemIndex, 0))
        this.cards.reset();
        this.cards.shuffle();
        this.players[turn(this.hakemIndex, 0)].cards = this.cards.shuffled_deck.slice(0, 13);
        this.players[turn(this.hakemIndex, 1)].cards = this.cards.shuffled_deck.slice(13, 26);
        this.players[turn(this.hakemIndex, 2)].cards = this.cards.shuffled_deck.slice(26, 39);
        this.players[turn(this.hakemIndex, 3)].cards = this.cards.shuffled_deck.slice(39, 52);
    }
    GetState() {
        return {
            hakem: this.hakem,
            hakemIndex: this.hakemIndex,
            players: this.players,
            teams: this.teams,
            playerTurn: this.playerTurn
        }
    }
}

export { GamePlayers }