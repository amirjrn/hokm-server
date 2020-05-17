export default interface IPlayer {
    name: string;
    socket_id: string;
    connected: boolean;
    disconnect: () => void;
    reconnect: () => void;
}