class Player {
    constructor(socket_id) {
        this.session;
        this.socket_id = socket_id;
        this.room;
    }
}

exports.player = Player;