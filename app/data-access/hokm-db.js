"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeHokmDb({ makeDb }) {
    return Object.freeze({
        findAll,
        findByName,
        findById,
        insert,
        remove,
        update
    });
    async function findAll() {
        const db = await makeDb();
        const result = await db.collection('games').find().toArray();
        return result;
    }
    async function findById({ id: _id }) {
        const db = await makeDb();
        const result = await db.collection('comments').find({ _id });
        const found = await result.toArray();
        if (found.length === 0) {
            return null;
        }
        const { _id: id, ...info } = found[0];
        return { id, ...info };
    }
    async function insert({ game }) {
        const db = await makeDb();
        const result = await db
            .collection("games")
            .insertOne(game);
        const { _id: id, ...insertedInfo } = result.ops[0];
        return { id, ...insertedInfo };
    }
    async function update(name, game) {
        const db = await makeDb();
        const result = await db
            .collection('comments')
            .updateOne({ gameOfName: name }, { $set: { game } });
        return result.modifiedCount > 0 ? { gameOfName: name, ...game } : null;
    }
    async function remove({ id: _id }) {
        const db = await makeDb();
        const result = await db.collection('comments').deleteOne({ _id });
        return result.deletedCount;
    }
    async function findByName(comment) {
        const db = await makeDb();
        const result = await db.collection('comments').find({ hash: comment.hash });
        const found = await result.toArray();
        if (found.length === 0) {
            return null;
        }
        const { _id: id, ...insertedInfo } = found[0];
        return { id, ...insertedInfo };
    }
}
exports.default = makeHokmDb;
