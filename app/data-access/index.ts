
import { createClient } from 'redis'
const client = createClient();
import makeHokmDb from './hokm-db'
import { Game } from '../domain/game'
import { config } from 'dotenv';
config();
const dbName = process.env.DB_NAME;
const game = new Game("mona");
client.set(game.nameOfGame, JSON.stringify(game));

//  export async function makeDb() {
//    if (!client.isConnected()) {
//      await client.connect()
//    }
//    return client.db(dbName)
//  }
//  const hokmDb = makeHokmDb({ makeDb });


// export default hokmDb





