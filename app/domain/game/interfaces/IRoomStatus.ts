export default interface IRoomStatus {
  players_connected: number
  status: string
  hakemIndex: number
  hakem: string
  setHakem: Function
  startGame: Function
  GetState: Function
}
