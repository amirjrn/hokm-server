import { RoomStatus } from './RoomStatus'
import { OnlinePlayer } from './OnlinePlayer'
import ITeam from './interfaces/ITeam'
import IOnlinePlayer from './interfaces/IOnlinePlayer'
class GamePlayers {
  private _room_status: RoomStatus

  private _players: IOnlinePlayer[]
  get players() {
    return this._players
  }

  private _teams: ITeam[]
  get teams() {
    return this._teams
  }
  set teams(teams: ITeam[]) {
    this._teams = teams
  }

  constructor({ room_status, players, teams }) {
    this._room_status = room_status
    this._players = players
    this._teams = teams
  }

  addPlayer(socket_id: string, name: string, session: string) {
    if (this._room_status.players_connected >= 4) {
      throw new Error('این اتاق پر شده است')
    }
    this._players.push(new OnlinePlayer({ name, socket_id, session }))
    this._room_status.players_connected++
    if (this._room_status.players_connected === 4) {
      this.initTeams()
      this._room_status.startGame()
      this._room_status.setHakem(null, this._players)
      this._room_status.spreadCards(this._players)
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
    this._players.map((player) => (player.socket_id = player.socket_id === socket ? null : player.socket_id))
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

  GetState() {
    return {
      players: this._players,
      teams: this._teams,
    }
  }
}

export { GamePlayers }
