import IPlayer from './../../player/interfaces/IPlayer'
export default interface IOnlinePlayer extends IPlayer {
  socket_id: string
  session: string
  cards: [number, string][]
  disconnect: () => void
  reconnect: () => void
}
