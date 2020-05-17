import { Player } from "../domain/player/player";

export function makeAddPlayer(name: string, socket_id: string) {
    return async function (){
        if (players.some(player => player.name === name)) {
            throw new Error("name taken")
        }
        await palyersDb.insertObject({name , socket_id})
        return "ok"
    }
    
}
export function makeRemovePlayer(socket_id) {
    return async function(){
         
    };
}
export function makeDisconnectPlayer(socket_id) {
    var player = players.find(player => player.socket_id = socket_id);
    player.disconnect();
}
export function makeReconnectPlayer(name) {
    var player = players.find(player => player.name = name);
    player.reconnect();
}
