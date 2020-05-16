"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
function makeDb(dbNumber) {
    const client = redis_1.createClient({ host: 'redis-server', port: 6379, db: dbNumber });
    console.log("s");
    return { makeDb: client };
}
exports.default = makeDb;
