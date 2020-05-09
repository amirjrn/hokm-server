

export default function makeHokmDb({ makeDb, promisify }) {
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
  })

  async function findAll() {
    return keysAsync('*');
  }
  async function findByName(name) {
    return await getAsync(name);
  }
  async function insertObject(name, obj) {
    return setAsync(name, JSON.stringify(obj))
  }
  async function remove(name) {
    return deleteAsync(name);
  }
}
