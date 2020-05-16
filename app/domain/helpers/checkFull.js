"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFull = void 0;
function checkFull(players_connected) {
    if (players_connected === 4) {
        return true;
    }
    return false;
}
exports.checkFull = checkFull;
