import IPlayer from './../../player/interfaces/IPlayer'
import ITeam from './ITeam'
export default interface IGamePlayers {
  hakem: string
  hakemIndex: number
  players: IPlayer
  teams: ITeam
  playerTurn: number
}
