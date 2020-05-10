
import { config } from 'dotenv';
import { MongoClient } from 'mongodb'
config();
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

export default async function makeMongoDb() {
    const client = new MongoClient(url, { useUnifiedTopology: true })
    if (!client.isConnected()) {
        await client.connect()
    }
    return client.db(dbName);
}
