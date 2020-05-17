import makeHokmDb from './redisdb'
import makePlayerDb from './mongodb'
import { config } from 'dotenv';
import { promisify } from 'util';
import makeMongoDb from './helpers/makeMongoDb'
import makeRedisDb from './helpers/makeRedisDb'
import IgameDb from './interfaces/IgameDb'
import IplayerDb from './interfaces/IplayerDb'
config();
const gamesDbNumber = process.env.GAMES_DB_NUMBER;
const playersDbNumber = process.env.PLAYERS_DB_NUMBER



const gamesDb: IgameDb = makeHokmDb({ ...makeRedisDb(gamesDbNumber), promisify });
const playersDb : IplayerDb = makePlayerDb(makeMongoDb)
// const playersDb = makeHokmDb({ ...makeRedisDb(playersDbNumber) });
export { gamesDb , playersDb }