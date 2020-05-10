"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const gamesDbNumber = process.env.GAMES_DB_NUMBER;
const playersDbNumber = process.env.PLAYERS_DB_NUMBER;
function makeDb(dbNumber) {
    const client = redis_1.createClient({ db: dbNumber });
    client.on("error", function (err) {
        console.error(err);
    });
    return { makeDb: client };
}
exports.default = makeDb;
