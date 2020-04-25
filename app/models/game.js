"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gamePlayers_1 = require("./gamePlayers");
const table_1 = require("./table");
class Game {
    constructor(name) {
        this.nameOfGame = name;
        this.game_players;
        this.table = new table_1.Table(this.game_players);
        this.game_players = new gamePlayers_1.GamePlayers(this.table);
    }
}
exports.Game = Game;
