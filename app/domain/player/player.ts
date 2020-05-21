import IPlayer from './interfaces/IPlayer'
class Player implements IPlayer {
  name: string
  socket_id: string
  connected: boolean
  cards: [number, string][]
  constructor({ name, socket_id }: { name: string; socket_id: string }) {
    this.name = name
    this.socket_id = socket_id
    this.connected
    this.cards = []
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
  getState() {
    return {
      name: this.name,
      socket_id: this.socket_id,
      connected: this.connected,
    }
  }
}

export { Player }
