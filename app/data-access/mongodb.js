"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeHokmDb(makeDb) {
    async function findAll() {
        const db = await makeDb();
        const res = await db.collection('games').find({}).toArray();
        return res.map(({ nameOfGame }) => nameOfGame);
    }
    async function findByName(nameOfGame) {
        const db = await makeDb();
        const res = await db.collection('games').find({ nameOfGame }).toArray();
        return res[0];
    }
    async function insertObject(nameOfGame, obj) {
        const db = await makeDb();
        const updateResult = await db.collection('games').updateOne({ nameOfGame }, { $set: obj });
        if (updateResult.result.n === 0) {
            const insertResult = await db
                .collection('games')
                .insertOne(obj);
            const { _id: id, ...insertedInfo } = insertResult.ops[0];
            return { id, ...insertedInfo };
        }
    }
    async function remove(name) {
    }
    return Object.freeze({
        findAll,
        findByName,
        insertObject,
        remove
    });
}
exports.default = makeHokmDb;
