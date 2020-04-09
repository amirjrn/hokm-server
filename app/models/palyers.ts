import { Player } from "./Player";
var players = [];

function addPlayer(name: string, socket_id: string, done: Function) {
    if (players.some(player => player.name === name)) {
        done('name taken');
    }
    else {
        players.push(new Player(name, socket_id));
        done(null)
    }

}
function removePlayer(socket_id) {
    players = players.filter(player => player.socket_id !== socket_id);
}
function disconnectPlayer(socket_id) {
    var player = players.find(player => player.socket_id = socket_id);
    player.disconnect();
}
function reconnectPlayer(name) {
    var player = players.find(player => player.name = name);
    player.reconnect();
}
export { addPlayer, removePlayer, disconnectPlayer, reconnectPlayer }