import IPlayer from './../../player/interfaces/IPlayer'
import ITeam from './ITeam'
export default interface IGame {
  nameOfGame: string
  shuffled_deck: [number, string][]
  dealed_deck_tracker: number
  deck: [number, string, string][]
  players_connected: number
  hakem: string
  hakemIndex: number
  currentHokm: string
  currentCard: string
  playerTurn: number
  players: IPlayer[]
  teams: ITeam[]
  status: string
}
