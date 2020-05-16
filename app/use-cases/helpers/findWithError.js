"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function findWithError(gameName, gamesDb) {
    const game = await gamesDb.findByName(gameName);
    if (game) {
        return game;
    }
    throw new Error("Game did not found");
}
exports.default = findWithError;
