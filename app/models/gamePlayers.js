"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spreadTurn_1 = require("../engine/spreadTurn");
class GamePlayers {
    constructor(table) {
        this.table = table;
        this.#players_connected = 0;
        this.players = [];
        this.teams = [];
        this.fullness = false;
    }
    #players_connected;
    addPlayer(socket_id, name, done) {
        if (this.#players_connected > 4) {
            return done('Game is full');
        }
        // if (!checkFull(this.#players_connected)) {
        //     return this.addDisconnectedPlayer(socket_id, name);
        // }
        this.players.push({ name, socket_id: socket_id });
        this.#players_connected++;
        if (this.#players_connected === 4) {
            this.table.startGame();
            this.setTeams();
            this.spreadCards();
            done(null, "start game");
        }
        else {
            done(null, "ok");
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
        this.table.stopGame();
    }
    disconnectPlayer(socket) {
        this.players.map(player => player.socket_id = player.socket_id === socket ? null : player.socket_id);
        this.table.stopGame();
    }
    addDisconnectedPlayer(socket, name) {
        for (let player of this.players) {
            if (player.hasOwnProperty('socket_id') && player.socket_id === null) {
                if (player.name === name) {
                    player.socket_id = socket.socket_id;
                    this.#players_connected++;
                    return;
                }
            }
        }
        if (this.#players_connected === 4) {
            this.table.continueGame();
        }
    }
    spreadCards() {
        this.table.cards.reset();
        this.table.cards.shuffle();
        this.players[spreadTurn_1.turn(this.table.hakemIndex, 0)].cards = this.table.cards.shuffled_deck.slice(0, 13);
        this.players[spreadTurn_1.turn(this.table.hakemIndex, 1)].cards = this.table.cards.shuffled_deck.slice(13, 26);
        this.players[spreadTurn_1.turn(this.table.hakemIndex, 2)].cards = this.table.cards.shuffled_deck.slice(26, 39);
        this.players[spreadTurn_1.turn(this.table.hakemIndex, 3)].cards = this.table.cards.shuffled_deck.slice(39, 52);
    }
}
exports.GamePlayers = GamePlayers;
