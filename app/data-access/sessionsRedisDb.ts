import { RedisClient } from 'redis'
import IsessionDb from './interfaces/IsessionDb'
export default function (makeDb: RedisClient, promisify): IsessionDb {
  const getAsync = promisify(makeDb.get).bind(makeDb)
  const setAsync = promisify(makeDb.set).bind(makeDb)

  async function findBySession(name: string): Promise<string> {
    return await getAsync(name)
  }
  async function saveSession({ session, name }: { session: string; name: string }): Promise<boolean> {
    return setAsync(session, name)
  }

  return Object.freeze({
    findBySession,
    saveSession,
  })
}
