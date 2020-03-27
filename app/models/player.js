class Player {
    constructor(session, socket_id, name) {
        this.session = session;
        this.socket_id = socket_id;
        this.name = name;
    }
}

exports.player = Player;