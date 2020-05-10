import { createClient } from 'redis'
import { config } from 'dotenv';
config();
const gamesDbNumber = process.env.GAMES_DB_NUMBER;
const playersDbNumber = process.env.PLAYERS_DB_NUMBER


export default function makeDb(dbNumber) {
    const client = createClient({ db: dbNumber });
    client.on("error", function (err) {
        console.error(err)
    })
    return { makeDb: client }
}