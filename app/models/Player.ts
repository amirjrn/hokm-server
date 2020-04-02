class Player {
    name: string;
    socket_id: string;
    session_id: string;
    constructor(name: string, socket_id: string, session_id: string) {
        this.name = name;
        this.socket_id = socket_id;
        this.session_id = session_id;
    }

}
export { Player }