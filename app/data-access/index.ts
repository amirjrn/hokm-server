import makeHokmDb from './game-db'
import { config } from 'dotenv';
import { promisify } from 'util';
import makeMongoDb from './helpers/makeMongoDb'
import makeRedisDb from './helpers/makeRedisDb'
import IgameDb from './interfaces/IgameDb'
config();
const gamesDbNumber = process.env.GAMES_DB_NUMBER;
const playersDbNumber = process.env.PLAYERS_DB_NUMBER



const gamesDb: IgameDb = makeHokmDb({ ...makeRedisDb(gamesDbNumber), promisify });

// const playersDb = makeHokmDb({ ...makeRedisDb(playersDbNumber) });
export { gamesDb }