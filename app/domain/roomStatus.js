"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomStatus {
    constructor({ players_connected, status, hakemIndex }) {
        this.players_connected = players_connected;
        this.status = status;
        this.hakemIndex = hakemIndex;
    }
    stopGame() {
        this.status === "Stopped";
    }
    continueGame() {
        this.status === "Game Started";
    }
    startGame() {
        // this.setHakem(null);
        this.status = "Game Started";
    }
    GetState() {
        return {
            players_connected: this.players_connected,
            status: this.status,
            hakemIndex: this.hakemIndex
        };
    }
}
exports.RoomStatus = RoomStatus;
