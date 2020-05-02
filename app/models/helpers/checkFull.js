"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkFull(players_connected) {
    if (players_connected === 4) {
        return true;
    }
    return false;
}
exports.checkFull = checkFull;
