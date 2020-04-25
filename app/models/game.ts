
import { GamePlayers } from './gamePlayers';
import { Table } from './table';
class Game {
    nameOfGame: string;
    table: Table;
    game_players: GamePlayers;
    constructor(name: string) {
        this.nameOfGame = name;
        this.game_players;
        this.table = new Table(this.game_players);
        this.game_players = new GamePlayers(this.table);
    }
}

export { Game }