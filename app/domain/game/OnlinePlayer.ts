import { Player } from './../player/player'
import IOnlinePlayer from './interfaces/IOnlinePlayer'
export class OnlinePlayer extends Player implements IOnlinePlayer {
  session: string
  socket_id: string
  constructor({ name, session, socket_id }) {
    super({ name, socket_id })
    this.session = session
  }
  disconnect() {
    if (this.connected) {
      this.connected = false
    }
  }
  reconnect() {
    if (!this.connected) {
      this.connected = true
    }
  }
}
