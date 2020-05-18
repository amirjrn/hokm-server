import IgameDb from './interfaces/IgameDb'
import IGame from '../domain/game/interfaces/IGame'
import { RedisClient } from 'redis'
export default function makeGamesRedisDb(
  makeDb: RedisClient,
  promisify
): IgameDb {
  const getAsync = promisify(makeDb.get).bind(makeDb)
  const setAsync = promisify(makeDb.set).bind(makeDb)
  const deleteAsync = promisify(makeDb.del).bind(makeDb)
  const keysAsync = promisify(makeDb.keys).bind(makeDb)

  async function findAll(): Promise<Array<string>> {
    return keysAsync('*')
  }
  async function findByName(name: string): Promise<IGame> {
    return JSON.parse(await getAsync(name))
  }
  async function insertObject(name, obj): Promise<Object> {
    return setAsync(name, JSON.stringify(obj))
  }
  async function remove(name) {
    return deleteAsync(name)
  }
  return Object.freeze({
    findAll,
    findByName,
    insertObject,
    remove,
  })
}
