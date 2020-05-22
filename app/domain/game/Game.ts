import { GamePlayers } from './GamePlayers'
import { Table } from './Table'
import { Cards } from './Cards'
import { RoomStatus } from './RoomStatus'
import { OnlinePlayer } from './OnlinePlayer'
import IGame from './interfaces/IGame'
import IRoomStatus from './interfaces/IRoomStatus'
import IOnlinePlayer from './interfaces/IOnlinePlayer'
import ITeam from './interfaces/ITeam'
export class Game {
  nameOfGame: string

  table: Table

  game_players: GamePlayers

  cards: Cards
  room_status: IRoomStatus
  player: IOnlinePlayer
  constructor(gamebuilder: Gamebuilder) {
    this.nameOfGame = gamebuilder.nameOfGame
    this.cards = new Cards({ ...gamebuilder })
    this.room_status = new RoomStatus({ cards: this.cards, ...gamebuilder })
    this.game_players = new GamePlayers({ room_status: this.room_status, ...gamebuilder })
    this.table = new Table({ GamePlayers: this.game_players, RoomStatus: this.room_status, ...gamebuilder })
  }
  GetState(): IGame {
    return {
      nameOfGame: this.nameOfGame,
      ...this.room_status.GetState(),
      ...this.cards.GetState(),
      ...this.game_players.GetState(),
      ...this.table.GetState(),
    }
  }
}

// game builder for game object
export class Gamebuilder implements IGame {
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
  players: IOnlinePlayer[]
  teams: ITeam[]
  status: string
  constructor(name: string) {
    if (!name) {
      throw new Error('لطفا یک نام برای بازی تعیین کنید')
    }
    this.nameOfGame = name
    this.shuffled_deck = []
    this.dealed_deck_tracker = 0
    this.deck = []
    this.players_connected = 0
    this.hakem
    this.hakemIndex
    this.currentHokm
    this.currentCard
    this.playerTurn
    this.players = []
    this.teams = []
    this.status = 'waiting for players'
  }
  setRoomStatus({
    players_connected = this.players_connected,
    status = this.status,
    hakemIndex = this.hakemIndex,
  } = {}) {
    this.players_connected = players_connected
    this.status = status
    this.hakemIndex = hakemIndex
    return this
  }
  setCards({ dealed_deck, shuffled_deck }) {
    this.dealed_deck_tracker = dealed_deck
    this.shuffled_deck = shuffled_deck
    return this
  }
  setGamePlayers({
    hakemIndex = this.hakemIndex,
    hakem = this.hakem,
    players = this.players,
    teams = this.teams,
    playerTurn = this.playerTurn,
  } = {}) {
    this.hakemIndex = hakemIndex
    this.hakem = hakem
    this.players = players
    this.teams = teams
    this.playerTurn = playerTurn
    return this
  }
  setTable({ deck, currentHokm, currentCard }) {
    this.deck = deck
    this.currentCard = currentCard
    this.currentHokm = currentHokm
    return this
  }
  reBuild({
    players_connected,
    status,
    dealed_deck_tracker,
    shuffled_deck,
    hakemIndex,
    hakem,
    players,
    teams,
    playerTurn,
    deck,
    currentHokm,
    currentCard,
  }) {
    this.shuffled_deck = shuffled_deck
    this.dealed_deck_tracker = dealed_deck_tracker
    this.deck = deck
    this.players_connected = players_connected
    this.hakem = hakem
    this.hakemIndex = hakemIndex
    this.currentHokm = currentHokm
    this.currentCard = currentCard
    this.playerTurn = playerTurn
    this.players = players
    this.teams = teams
    this.status = status
    return this
  }
  build() {
    return new Game(this)
  }
}
