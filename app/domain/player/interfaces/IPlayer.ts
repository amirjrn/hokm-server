export default interface IPlayer {
  name: string
  socket_id: string
  connected: boolean
  cards: [number, string][]
  disconnect: () => void
  reconnect: () => void
}
