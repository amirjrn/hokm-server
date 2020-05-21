import { findFirstَََAce } from './helpers/findFirstace'
import { turn } from './helpers/spreadTurn'
import { Deck as Cards } from './Cards'
import { RoomStatus } from './roomStatus'
import ITeam from './interfaces/ITeam'
import IPlayer from '../player/interfaces/IPlayer'
import { Player } from '../player/player'
class GamePlayers {
  private _room_status: RoomStatus
  private _cards: Cards
  private _player: IPlayer

  private _players: IPlayer[]
  get players() {
    return this._players
  }

  private _hakem: string
  get hakem() {
    return this._hakem
  }

  private _hakemIndex: number
  get hakemIndex() {
    return this.hakemIndex
  }

  private _teams: ITeam[]
  get teams() {
    return this._teams
  }
  set teams(teams: ITeam[]) {
    this._teams = teams
  }
  _playerTurn: number
  get playerTurn() {
    return this._playerTurn
  }
  constructor({
    cards,
    room_status,
    player,
    hakem,
    hakemIndex,
    players,
    teams,
    playerTurn,
  }) {
    this._player = player
    this._cards = cards
    this._room_status = room_status
    this._hakem = hakem
    this._hakemIndex = hakemIndex
    this._players = players
    this._teams = teams
    this._playerTurn = playerTurn
  }
  addPlayer(socket_id: string, name: string) {
    if (this._room_status.players_connected >= 4) {
      throw new Error('Game is full')
    }
    // if (!checkFull(this.#players_connected)) {
    //     return this.addDisconnectedPlayer(socket_id, name);
    // }
    this._players.push(new Player({ name, socket_id }))
    this._room_status.players_connected++
    if (this._room_status.players_connected === 4) {
      this._room_status.startGame()
      this.setHakem(null)
      this.initTeams()
      this.spreadCards()
      return 'start game'
    }
    return 'ok'
  }
  initTeams() {
    this._teams = [
      {
        //the first team includes first and third players from players list
        players: [this._players[0].name, this._players[2].name],
        won_dast: 0,
        won_bazi: 0,
      },
      // the second team includes second and forth player from players list
      {
        players: [this._players[1].name, this._players[3].name],
        won_dast: 0,
        won_bazi: 0,
      },
    ]
  }
  removePlayer(socket) {
    this._players.filter((player) => player.socket_id !== socket)
    this._room_status.stopGame()
  }
  disconnectPlayer(socket) {
    this._players.map(
      (player) =>
        (player.socket_id =
          player.socket_id === socket ? null : player.socket_id)
    )
    this._room_status.stopGame()
  }
  // addDisconnectedPlayer(socket, name) {
  //     for (let player of this.players) {
  //         if (player.hasOwnProperty('socket_id') && player.socket_id === null) {
  //             if (player.name === name) {
  //                 player.socket_id = socket.socket_id;
  //                 this.#players_connected++;
  //                 return;
  //             }
  //         }
  //     }
  //     if (this.#players_connected === 4) {
  //         this.table.continueGame();
  //     }
  // }
  setHakem(winnerTeam) {
    // if it is the first game , the game has no winner so hakem should be set randomly.
    if (!winnerTeam && this._hakem === undefined) {
      this._cards.shuffle()
      this._hakemIndex = findFirstَََAce(this._cards)
      this._hakem = this._players[this._hakemIndex].name
    }
    // if previuos hakem is in winner team , hakem should not be changed . Otherwise hakem should be next player;
    else if (!winnerTeam.players.find((player) => player === this._hakem)) {
      this._hakemIndex = this._hakemIndex === 3 ? 0 : ++this._hakemIndex
      this._hakem = this._players[this._hakemIndex].name
    }
    // Every time hakem is changed , it is hakem's turn to play.
    this.setPlayerTurn(this._hakemIndex)
  }

  //There are three situations where players turn changes :
  // 1-hakem is set : always hakem is the player to play;
  // 2-card is played : the next player after one who has played card ;
  // 3-winner Of bazi has been choosen : the player who has played the highest card ;
  setPlayerTurn(hakemOrWinner: number = undefined) {
    if (hakemOrWinner !== undefined) {
      this._playerTurn = hakemOrWinner
    } else {
      this._playerTurn = this._playerTurn === 3 ? 0 : ++this._playerTurn
    }
  }
  spreadCards() {
    this._cards.reset()
    this._cards.shuffle()
    this._players[
      turn(this._hakemIndex, 0)
    ].cards = this._cards.shuffled_deck.slice(0, 13)
    this._players[
      turn(this._hakemIndex, 1)
    ].cards = this._cards.shuffled_deck.slice(13, 26)
    this._players[
      turn(this._hakemIndex, 2)
    ].cards = this._cards.shuffled_deck.slice(26, 39)
    this._players[
      turn(this._hakemIndex, 3)
    ].cards = this._cards.shuffled_deck.slice(39, 52)
  }
  GetState() {
    return {
      hakem: this._hakem,
      hakemIndex: this._hakemIndex,
      players: this._players,
      teams: this._teams,
      playerTurn: this._playerTurn,
    }
  }
}

export { GamePlayers }
