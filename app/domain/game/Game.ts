import { GamePlayers } from './GamePlayers'
import { Table } from './Table'
import { Deck as Cards } from './Cards'
import { RoomStatus } from './RoomStatus'
import { Player } from '../player/player'
import IGame from './interfaces/IGame'
import IRoomStatus from './interfaces/IRoomStatus'
import IPlayer from '../player/interfaces/IPlayer'
export class Game {
  readonly nameOfGame: string

  private _table: Table
  get table() {
    return this._table
  }

  private _game_players: GamePlayers
  get game_players() {
    return this.game_players
  }

  cards: Cards
  room_status: IRoomStatus
  player: IPlayer
  constructor(gamebuilder: Gamebuilder) {
    this.nameOfGame = gamebuilder.nameOfGame
    this.room_status = new RoomStatus({ ...gamebuilder })
    this.cards = new Cards({ ...gamebuilder })
    this._game_players = new GamePlayers({
      player: Player,
      cards: this.cards,
      room_status: this.room_status,
      ...gamebuilder,
    })
    this._table = new Table({ GamePlayers: this._game_players, ...gamebuilder })
  }
  GetState(): IGame {
    return {
      nameOfGame: this.nameOfGame,
      ...this.room_status.GetState(),
      ...this.cards.GetState(),
      ...this._game_players.GetState(),
      ...this._table.GetState(),
    }
  }
}

export class Gamebuilder implements IGame {
  nameOfGame: string
  shuffled_deck: Array<any>
  dealed_deck: Array<any>
  deck: Array<any>
  players_connected: number
  hakem: string
  hakemIndex: number
  currentHokm: string
  currentCard: string
  playerTurn: number
  players: Array<any>
  teams: Array<any>
  status: string
  constructor(name: string) {
    if (!name) {
      throw new Error('لطفا یک نام برای بازی تعیین کنید')
    }
    this.nameOfGame = name
    this.shuffled_deck = []
    this.dealed_deck = []
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
    this.dealed_deck = dealed_deck
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
    dealed_deck,
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
    this.dealed_deck = dealed_deck
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
