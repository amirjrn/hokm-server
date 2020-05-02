
import { GamePlayers } from './gamePlayers';
import { Table } from './table';
import { Deck as Cards } from './cards';
import { RoomStatus } from './roomStatus'
class Game {
    nameOfGame: string;
    table: Table;
    game_players: GamePlayers;
    cards: Cards;
    room_satus: RoomStatus;
    constructor(name: string) {
        this.nameOfGame = name;
        this.room_satus = new RoomStatus();
        this.cards = new Cards();
        this.game_players = new GamePlayers(this.table, this.cards, this.room_satus);
        this.table = new Table(this.game_players, this.cards, this.room_satus);

    }
}

export { Game }