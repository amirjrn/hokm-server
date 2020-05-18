"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
dotenv_1.config();
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;
async function makeMongoDb() {
    const client = new mongodb_1.MongoClient(url, {
        useUnifiedTopology: true,
    });
    if (!client.isConnected()) {
        await client.connect();
    }
    return client.db(dbName);
}
exports.default = makeMongoDb;
