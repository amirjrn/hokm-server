
import { createClient } from 'redis'
import makeHokmDb from './game-db'
import { config } from 'dotenv';
import { promisify } from 'util';
config();
const gamesDbNumber = process.env.GAMES_DB_NUMBER;
const playersDbNumber = process.env.PLAYERS_DB_NUMBER

export function makeDb(dbNumber) {
    const client = createClient({ db: dbNumber });
    client.on("error", function (err) {
        console.error(err)
    })
    return { makeDb: client }
}

const gamesDb = makeHokmDb({ ...makeDb(gamesDbNumber), promisify });
const playersDb = makeHokmDb({ ...makeDb(playersDbNumber), promisify });

export { gamesDb, playersDb }