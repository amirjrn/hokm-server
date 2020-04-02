"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name, socket_id, session_id) {
        this.name = name;
        this.socket_id = socket_id;
        this.session_id = session_id;
    }
}
exports.Player = Player;
