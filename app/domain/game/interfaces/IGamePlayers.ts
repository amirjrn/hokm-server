import IOnlinePlayer from './IOnlinePlayer'
import ITeam from './ITeam'
export default interface IGamePlayers {
  hakem: string
  hakemIndex: number
  players: IOnlinePlayer
  teams: ITeam
  playerTurn: number
}
