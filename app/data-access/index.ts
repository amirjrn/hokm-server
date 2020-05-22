import makeGamesRedisDb from './gamesRedisDb'
import makePlayersMongoDb from './palyersMongoDb'
import makeSessionsRedisDb from './sessionsRedisDb'
import { config } from 'dotenv'
import { promisify } from 'util'
import makeMongoDb from './helpers/makeMongoDb'
import makeRedisDb from './helpers/makeRedisDb'
import IgameDb from './interfaces/IgameDb'
import IplayerDb from './interfaces/IplayerDb'
import ISessionsDb from './interfaces/IsessionDb'
config()
const gamesDbNumber = process.env.GAMES_DB_NUMBER
const sessionsDbNumber = process.env.SESSIONS_DB_NUMBER

const gamesDb: IgameDb = makeGamesRedisDb(makeRedisDb(gamesDbNumber), promisify)
const sessionsDb: ISessionsDb = makeSessionsRedisDb(makeRedisDb(sessionsDbNumber), promisify)
const playersDb: IplayerDb = makePlayersMongoDb(makeMongoDb)
export { gamesDb, playersDb, sessionsDb }
