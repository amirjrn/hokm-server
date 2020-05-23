export default interface IRoomStatus {
  players_connected: number
  status: string
  hakemIndex: number
  hakem: string
  GetState: Function
}
