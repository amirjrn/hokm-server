import IPlayer from '../../domain/player/interfaces/IPlayer';
import { Db, InsertOneWriteOpResult } from 'mongodb';
export default interface IplayersDb {
  findByProp: (name: string) => Promise<IPlayer>;
  insertObject: (
    name: string,
    obj: Object
  ) => Promise<InsertOneWriteOpResult<any>>;
  remove: Function;
}
