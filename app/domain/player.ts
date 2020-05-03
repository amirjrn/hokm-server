class Player {
    name: string;
    socket_id: string;
    connected: boolean;
    constructor(name: string, socket_id: string) {
        this.name = name;
        this.socket_id = socket_id;
        this.connected;
    }
    disconnect() {
        if (this.connected) {
            this.connected = false;
        }
    }
    reconnect() {
        if (!this.connected) {
            this.connected = true;
        }
    }
}
export { Player }