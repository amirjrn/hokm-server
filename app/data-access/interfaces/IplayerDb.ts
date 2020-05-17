import IPlayer from '../../domain/player/interfaces/IPlayer'
export default interface IplayersDb {
    findAll: () => Promise<Array<string>>
    findByName: (name: string) => Promise<IPlayer>
    insertObject: (name: string, obj: Object) => Promise<Object>
    remove: Function
}