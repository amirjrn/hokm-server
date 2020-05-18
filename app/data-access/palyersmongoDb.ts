import IplayerDb from './interfaces/IplayerDb'
import IPlayer from '../domain/player/interfaces/IPlayer'
import { Db, InsertOneWriteOpResult } from 'mongodb'

//connect to a database in mongodb and attach following methods to this database.
export default function makePlayersMongoDb(
  makeDb: () => Promise<Db>
): IplayerDb {
  // function to find a single player by its props

  async function findByProp(prop: string): Promise<IPlayer> {
    const db = await makeDb()
    const res = await db.collection('players').find({ prop }).toArray()
    return res[0]
  }

  // function to insert a player to mongodb or update it if exists
  async function insertObject(
    name: string,
    obj: IPlayer
  ): Promise<InsertOneWriteOpResult<any>> {
    //update the player's data
    const db = await makeDb()
    const updateResult = await db
      .collection('players')
      .updateOne({ name }, { $set: obj })
    //if player's data does not exist then insert it
    if (updateResult.result.n === 0) {
      return await db.collection('players').insertOne(obj)
    }
  }

  // function to delete a player
  async function remove(name) {}
  return Object.freeze({
    findByProp,
    insertObject,
    remove,
  })
}
