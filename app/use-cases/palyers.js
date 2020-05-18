"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReconnectPlayer = exports.makeDisconnectPlayer = exports.makeRemovePlayer = exports.makeAddPlayer = void 0;
const player_1 = require("../domain/player/player");
function makeAddPlayer(playersDb) {
    return async function (name, socket_id, callback) {
        if (await playersDb.findByProp(name)) {
            throw new Error('name taken');
        }
        await playersDb.insertObject(name, new player_1.Player(name, socket_id));
        callback(false, 'OK');
    };
}
exports.makeAddPlayer = makeAddPlayer;
function makeRemovePlayer(playersDb) {
    return async function (socket_id) {
        await playersDb.remove(socket_id);
    };
}
exports.makeRemovePlayer = makeRemovePlayer;
function makeDisconnectPlayer(playersDb) {
    return async function (socket_id) {
        var player = await playersDb.findByProp(socket_id);
        player.disconnect();
    };
}
exports.makeDisconnectPlayer = makeDisconnectPlayer;
function makeReconnectPlayer(playersDb) {
    return async function (socket_id) {
        var player = await playersDb.findByProp(socket_id);
        player.reconnect();
    };
}
exports.makeReconnectPlayer = makeReconnectPlayer;
