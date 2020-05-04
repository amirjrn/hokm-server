"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gamePlayers_1 = require("./gamePlayers");
const table_1 = require("./table");
const cards_1 = require("./cards");
const roomStatus_1 = require("./roomStatus");
class Game {
    constructor(name) {
        this.nameOfGame = name;
        this.room_satus = new roomStatus_1.RoomStatus();
        this.cards = new cards_1.Deck();
        this.game_players = new gamePlayers_1.GamePlayers(this.table, this.cards, this.room_satus);
        this.table = new table_1.Table(this.game_players, this.cards, this.room_satus);
    }
}
exports.Game = Game;
var hi = "amir";
exports.hi = hi;
