"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function turn(hakemIndex, turn) {
    return (hakemIndex + turn) % 4;
}
exports.turn = turn;
