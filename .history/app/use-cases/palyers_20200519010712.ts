import { Player } from '../domain/player/player'
import IplayersDb from './../data-access/interfaces/IplayerDb'

export function makeAddPlayer(playersDb: IplayersDb): Function {
  return async function (name: string, socket_id: string) {
    if (await playersDb.findByProp(name)) {
      throw new Error('name taken')
    }
    await playersDb.insertObject(name, new Player(name, socket_id).getState())
  }
}

export function makeRemovePlayer(playersDb: IplayersDb): Function {
  return async function (socket_id) {
    await playersDb.remove(socket_id)
  }
}
export function makeDisconnectPlayer(playersDb: IplayersDb): Function {
  return async function (socket_id) {
    var player = await playersDb.findByProp(socket_id)
    player.disconnect()
  }
}
export function makeReconnectPlayer(playersDb: IplayersDb): Function {
  return async function (socket_id) {
    var player = await playersDb.findByProp(socket_id)
    player.reconnect()
  }
}
