export default interface IGame {
    nameOfGame: string;
    shuffled_deck: Array<any>;
    dealed_deck: Array<any>;
    deck: Array<any>;
    players_connected: number;
    hakem: string;
    hakemIndex: number;
    currentHokm: string;
    currentCard: string;
    playerTurn: number;
    players: Array<any>;
    teams: Array<any>;
    status: string;
}