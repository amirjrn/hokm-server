import { createClient, RedisClient } from 'redis'
import { config } from 'dotenv'
config()
const redisHost = process.env.REDIS_HOST
export default function makeDb(dbNumber): RedisClient {
  const client = createClient({
    host: redisHost,
    port: 6379,
    db: dbNumber,
  })
  return client
}
