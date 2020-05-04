"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = redis_1.createClient();
const game_1 = require("../domain/game");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const dbName = process.env.DB_NAME;
const game = new game_1.Game("mona");
client.set(game.nameOfGame, JSON.stringify(game));
//  export async function makeDb() {
//    if (!client.isConnected()) {
//      await client.connect()
//    }
//    return client.db(dbName)
//  }
//  const hokmDb = makeHokmDb({ makeDb });
// export default hokmDb
