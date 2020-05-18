import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { Db } from 'mongodb';
config();
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

export default async function makeMongoDb(): Promise<Db> {
  const client: MongoClient = new MongoClient(url, {
    useUnifiedTopology: true,
  });
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}
