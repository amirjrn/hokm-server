class RoomStatus {
    players_connected: number;
    status: string;
    hakemIndex: number;
    constructor() {
        this.players_connected = 0;
        this.status = "waiting for players";
        this.hakemIndex = undefined;
    }
    stopGame() {
        this.status === "Stopped";
    }
    continueGame() {
        this.status === "Game Started"
    }
    startGame() {
        // this.setHakem(null);
        this.status = "Game Started";
    }
}
export { RoomStatus }