"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
var players = [];
function addPlayer(name, socket_id, done) {
    if (players.some(player => player.name === name)) {
        done('name taken');
    }
    else {
        players.push(new Player_1.Player(name, socket_id));
        done(null);
    }
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
