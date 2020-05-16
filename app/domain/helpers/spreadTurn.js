"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turn = void 0;
function turn(hakemIndex, turn) {
    return (hakemIndex + turn) % 4;
}
exports.turn = turn;
