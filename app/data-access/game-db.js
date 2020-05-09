"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeHokmDb({ makeDb, promisify }) {
    const getAsync = promisify(makeDb.get).bind(makeDb);
    const setAsync = promisify(makeDb.set).bind(makeDb);
    const deleteAsync = promisify(makeDb.del).bind(makeDb);
    const keysAsync = promisify(makeDb.keys).bind(makeDb);
    return Object.freeze({
        findAll,
        findByName,
        insertObject,
        remove,
        makeDb
    });
    async function findAll() {
        return keysAsync('*');
    }
    async function findByName(name) {
        const game = await getAsync(name);
        if (!game) {
            throw new Error('Game did not found');
        }
        return game;
    }
    async function insertObject(name, obj) {
        return setAsync(name, JSON.stringify(obj));
    }
    async function remove(name) {
        return deleteAsync(name);
    }
}
exports.default = makeHokmDb;
