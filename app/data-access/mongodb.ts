import IgameDb from './interfaces/IgameDb'
import IGame from './../domain/interfaces/IGame'
export default function makeHokmDb(makeDb): IgameDb {

    async function findAll(): Promise<Array<string>> {
        const db = await makeDb();
        const res = await db.collection('games').find({}).toArray();
        return res.map(({ nameOfGame }) => nameOfGame)
    }
    async function findByName(nameOfGame: string): Promise<IGame> {
        const db = await makeDb();
        const res = await db.collection('games').find({ nameOfGame }).toArray();
        return res[0];
    }
    async function insertObject(name: string, obj: IGame): Promise<Object> {
        const db = await makeDb()
        const updateResult = await db.collection('games').updateOne({ name }, { $set: obj })
        if (updateResult.result.n === 0) {
            const insertResult = await db
                .collection('games')
                .insertOne(obj)
            const { _id: id, ...insertedInfo } = insertResult.ops[0]
            return { id, ...insertedInfo }
        }

    }
    async function remove(name) {

    }
    return Object.freeze({
        findAll,
        findByName,
        insertObject,
        remove
    })

}