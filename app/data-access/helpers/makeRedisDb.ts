import { createClient, RedisClient } from 'redis'

export default function makeDb(dbNumber): RedisClient {
  const client = createClient({
    host: 'redis-server',
    port: 6379,
    db: dbNumber,
  })
  return client
}
