import makeGamesRedisDb from './gamesRedisDb'
import makePlayerMongoDb from './palyersmongoDb'
import { config } from 'dotenv'
import { promisify } from 'util'
import makeMongoDb from './helpers/makeMongoDb'
import makeRedisDb from './helpers/makeRedisDb'
import IgameDb from './interfaces/IgameDb'
import IplayerDb from './interfaces/IplayerDb'
config()
const gamesDbNumber = process.env.GAMES_DB_NUMBER

const gamesDb: IgameDb = makeGamesRedisDb(makeRedisDb(gamesDbNumber), promisify)
const playersDb: IplayerDb = makePlayerMongoDb(makeMongoDb)
export { gamesDb, playersDb }
