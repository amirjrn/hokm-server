import { createClient } from 'redis'

export default function makeDb(dbNumber) {
    const client = createClient({ host: 'redis_db', port: 6379, db: dbNumber });
    console.log("s")
    return { makeDb: client }
}