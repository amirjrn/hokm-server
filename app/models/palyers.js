"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
var players = [];
function addPlayer(name, socket_id) {
    if (players.some(player => player.name === name)) {
        return new Error("name taken");
    }
    players.push(new player_1.Player(name, socket_id));
    return "ok";
}
exports.addPlayer = addPlayer;
function removePlayer(socket_id) {
    players = players.filter(player => player.socket_id !== socket_id);
}
exports.removePlayer = removePlayer;
function disconnectPlayer(socket_id) {
    var player = players.find(player => player.socket_id = socket_id);
    player.disconnect();
}
exports.disconnectPlayer = disconnectPlayer;
function reconnectPlayer(name) {
    var player = players.find(player => player.name = name);
    player.reconnect();
}
exports.reconnectPlayer = reconnectPlayer;
