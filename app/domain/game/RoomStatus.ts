import { findFirstَََAce } from './helpers/findFirstace'
import { turn } from './helpers/spreadTurn'
import ICards from './interfaces/ICards'
class RoomStatus {
  private _cards: ICards

  private _players_connected: number
  get players_connected() {
    return this._players_connected
  }
  set players_connected(newPlayersNumber) {
    if (newPlayersNumber - this._players_connected !== 1) {
      throw new Error('it is possible to increment only by one at a time')
    }
    this._players_connected = newPlayersNumber
  }

  private _status: string
  get status() {
    return this._status
  }

  private _hakem: string
  get hakem() {
    return this._hakem
  }

  private _hakemIndex: number
  get hakemIndex() {
    return this.hakemIndex
  }

  private _playerTurn: number
  get playerTurn() {
    return this._playerTurn
  }
  constructor({ players_connected, status, hakemIndex, cards, playerTurn }) {
    this._cards = cards
    this._players_connected = players_connected
    this._status = status
    this._hakemIndex = hakemIndex
    this._playerTurn = playerTurn
  }

  setHakem(winnerTeam, players) {
    // if it is the first game , the game has no winner so hakem should be set randomly.
    if (!winnerTeam && this._hakem === undefined) {
      this._cards.shuffle()
      this._hakemIndex = findFirstَََAce(this._cards)
      this._hakem = players[this._hakemIndex].name
    }
    // if previuos hakem is in winner team , hakem should not be changed . Otherwise hakem should be next player;
    else if (!winnerTeam.players.find((player) => player === this._hakem)) {
      this._hakemIndex = this._hakemIndex === 3 ? 0 : ++this._hakemIndex
      this._hakem = players[this._hakemIndex].name
    }
    // Every time hakem is changed , it is hakem's turn to play.
    this.setPlayerTurn(this._hakemIndex)
  }

  //There are three situations where players turn changes :
  // 1-hakem is set : always hakem is the player to play;
  // 2-card is played : the next player after one who has played card ;
  // 3-winner Of bazi has been choosen : the player who has played the highest card ;
  setPlayerTurn(hakemOrWinner: number = undefined) {
    if (hakemOrWinner !== undefined) {
      this._playerTurn = hakemOrWinner
    } else {
      this._playerTurn = this._playerTurn === 3 ? 0 : ++this._playerTurn
    }
  }
  spreadCards(players) {
    console.log(players)
    this._cards.reset()
    this._cards.shuffle()
    players[turn(this._hakemIndex, 0)].cards = this._cards.shuffled_deck.slice(0, 13)
    players[turn(this._hakemIndex, 1)].cards = this._cards.shuffled_deck.slice(13, 26)
    players[turn(this._hakemIndex, 2)].cards = this._cards.shuffled_deck.slice(26, 39)
    players[turn(this._hakemIndex, 3)].cards = this._cards.shuffled_deck.slice(39, 52)
  }
  stopGame() {
    this._status === 'Stopped'
  }
  continueGame() {
    this._status === 'Game Started'
  }
  startGame() {
    // this.setHakem(null);
    this._status = 'Game Started'
  }
  GetState() {
    return {
      players_connected: this._players_connected,
      status: this._status,
      hakemIndex: this._hakemIndex,
    }
  }
}
export { RoomStatus }
