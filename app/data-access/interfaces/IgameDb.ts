import IGame from '../../domain/game/interfaces/IGame'
export default interface IgameDb {
  findAll: () => Promise<Array<string>>
  findByName: (name: string) => Promise<IGame>
  insertObject: (name: string, obj: Object) => Promise<boolean>
  remove: Function
}
