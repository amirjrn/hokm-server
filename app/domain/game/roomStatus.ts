class RoomStatus {
  private _players_connected: number
  get players_connected() {
    return this._players_connected
  }
  set players_connected(newPlayersNumber) {
    if (newPlayersNumber - this._players_connected !== 1) {
      throw new Error('it is possible to increment only by one at a time')
    }
    this._players_connected = newPlayersNumber
  }
  private _status: string
  get status() {
    return this._status
  }

  private _hakemIndex: number
  get hakemIndex() {
    return this._hakemIndex
  }

  constructor({ players_connected, status, hakemIndex }) {
    this._players_connected = players_connected
    this._status = status
    this._hakemIndex = hakemIndex
  }

  stopGame() {
    this._status === 'Stopped'
  }
  continueGame() {
    this._status === 'Game Started'
  }
  startGame() {
    // this.setHakem(null);
    this._status = 'Game Started'
  }
  GetState() {
    return {
      players_connected: this._players_connected,
      status: this._status,
      hakemIndex: this._hakemIndex,
    }
  }
}
export { RoomStatus }
