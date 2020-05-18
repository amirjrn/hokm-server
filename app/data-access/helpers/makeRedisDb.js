"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const redisHost = process.env.REDIS_HOST;
function makeDb(dbNumber) {
    const client = redis_1.createClient({
        host: redisHost,
        port: 6379,
        db: dbNumber,
    });
    return client;
}
exports.default = makeDb;
