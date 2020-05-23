import { Player } from '../domain/player/player'
import IplayersDb from './../data-access/interfaces/IplayerDb'
import IsessionsDb from './../data-access/interfaces/IsessionDb'

export function makeAddPlayer(playersDb: IplayersDb, sessionsDb: IsessionsDb, sessionG: () => string) {
  return async function (name: string, socket_id: string, callback) {
    const session = sessionG()
    const addPlayerRes = await playersDb.insertObject(name, new Player({ name, socket_id }).getState())
    await sessionsDb.saveSession({ session, name })
    callback(session)
  }
}

export function makeRemovePlayer(playersDb: IplayersDb): Function {
  return async function (name) {
    await playersDb.remove(name)
  }
}
export function makeDisconnectPlayer(playersDb: IplayersDb): Function {
  return async function (socket_id) {
    var player = await playersDb.findByProp(socket_id)
  }
}
export function makeReconnectPlayer(playersDb: IplayersDb): Function {
  return async function (socket_id) {
    var player = await playersDb.findByProp(socket_id)
  }
}
