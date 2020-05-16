import { Player } from "../domain/player";

function addPlayer(name: string, socket_id: string) {
    if (players.some(player => player.name === name)) {
        return new Error("name taken")
    }
    players.push(new Player(name, socket_id));
    return "ok"
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