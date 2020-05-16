"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name, socket_id) {
        this.name = name;
        this.socket_id = socket_id;
        this.connected;
    }
    disconnect() {
        if (this.connected) {
            this.connected = false;
        }
    }
    reconnect() {
        if (!this.connected) {
            this.connected = true;
        }
    }
}
exports.Player = Player;
