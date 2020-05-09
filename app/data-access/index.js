"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const game_db_1 = require("./game-db");
const dotenv_1 = require("dotenv");
const util_1 = require("util");
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
exports.makeDb = makeDb;
const gamesDb = game_db_1.default({ ...makeDb(gamesDbNumber), promisify: util_1.promisify });
exports.gamesDb = gamesDb;
const playersDb = game_db_1.default({ ...makeDb(playersDbNumber), promisify: util_1.promisify });
exports.playersDb = playersDb;
