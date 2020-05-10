"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gamePlayers_1 = require("./gamePlayers");
const table_1 = require("./table");
const cards_1 = require("./cards");
const roomStatus_1 = require("./roomStatus");
class Game {
    constructor(gamebuilder) {
        this.nameOfGame = gamebuilder.nameOfGame;
        this.room_status = new roomStatus_1.RoomStatus({ ...gamebuilder });
        this.cards = new cards_1.Deck({ ...gamebuilder });
        this.game_players = new gamePlayers_1.GamePlayers({ cards: this.cards, room_status: this.room_status, ...gamebuilder });
        this.table = new table_1.Table({ GamePlayers: this.game_players, ...gamebuilder });
    }
    GetState() {
        return {
            nameOfGame: this.nameOfGame,
            ...this.room_status.GetState(),
            ...this.cards.GetState(),
            ...this.game_players.GetState(),
            ...this.table.GetState(),
        };
    }
}
exports.Game = Game;
class Gamebuilder {
    constructor(name) {
        this.nameOfGame = name;
        this.shuffled_deck = [];
        this.dealed_deck = [];
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
    }
    setRoomStatus({ players_connected, status, hakemIndex }) {
        this.players_connected = players_connected;
        this.status = status;
        this.hakemIndex = hakemIndex;
        return this;
    }
    setCards({ dealed_deck, shuffled_deck }) {
        this.dealed_deck = dealed_deck;
        this.shuffled_deck = shuffled_deck;
        return this;
    }
    setGamePlayers({ hakemIndex, hakem, players, teams, playerTurn }) {
        this.hakemIndex = hakemIndex;
        this.hakem = hakem;
        this.players = players;
        this.teams = teams;
        this.playerTurn = playerTurn;
        return this;
    }
    setTable({ deck, currentHokm, currentCard }) {
        this.deck = deck;
        this.currentCard = currentCard;
        this.currentHokm = currentHokm;
        return this;
    }
    reBuild({ players_connected, status, dealed_deck, shuffled_deck, hakemIndex, hakem, players, teams, playerTurn, deck, currentHokm, currentCard }) {
        this.shuffled_deck = shuffled_deck;
        this.dealed_deck = dealed_deck;
        this.deck = deck;
        this.players_connected = players_connected;
        this.hakem = hakem;
        this.hakemIndex = hakemIndex;
        this.currentHokm = currentHokm;
        this.currentCard = currentCard;
        this.playerTurn = playerTurn;
        this.players = players;
        this.teams = teams;
        this.status = status;
        return this;
    }
    build() {
        return new Game(this);
    }
}
exports.Gamebuilder = Gamebuilder;
