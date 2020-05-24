import { setHighest } from './helpers/setHighest'
import { moveCard } from './helpers/moveCard'
import { GamePlayers } from './GamePlayers'
import { RoomStatus } from './RoomStatus'
class Table {
  private _GamePlayers: GamePlayers
  private _RoomStatus: RoomStatus

  private _deck: Array<any>
  get deck(): Array<any> {
    return this._deck
  }

  private _currentHokm: string
  get currentHokm() {
    return this._currentHokm
  }

  private _currentCard: string
  get currentCard() {
    return this._currentCard
  }

  constructor({ GamePlayers, RoomStatus, deck, currentHokm, currentCard }) {
    this._GamePlayers = GamePlayers
    this._RoomStatus = RoomStatus
    this._deck = deck
    this._currentHokm = currentHokm
    this._currentCard = currentCard
  }

  hokm(suit: string, session: string) {
    if (this._RoomStatus.hakem !== session) {
      throw new Error('شما حاکم نیستید')
    }
    this._currentHokm = suit
  }
  finishBazi() {
    this._currentCard = null
    this._deck = []
  }
  playCard(card, session: string) {
    var player = this._GamePlayers.players.find((player) => player.session === session)
    if (!player) {
      throw new Error('شما عضو این اتاق نیستید')
    }
    if (this._GamePlayers.players[this._RoomStatus.playerTurn].session !== session) {
      throw new Error('نوبت شما نیست')
    }
    if (!player.cards.find((playerCard) => playerCard[0] === card[0] && playerCard[1] === card[1])) {
      throw new Error('شما این کارت را ندارید')
    }
    if (
      // if the game has already a played card in deck
      this._currentCard &&
      // and this card's suit exists in player's cards
      player.cards.find((playerCard) => playerCard[1] === this._currentCard) &&
      // but player does not play that
      this._currentCard !== card[1]
    ) {
      throw new Error('لطفا کارت موجود را بازی کنید')
    }
    const has_winner = this.moveCard(card, player)
    return has_winner
  }

  moveCard(card, player) {
    moveCard(this, card, player)
    //  set winner when four cards is already in deck
    if (this._deck.length === 4) {
      return this.setWinnerOfBazi()
    }
    // if this is the first card to play , set the current card of game and change the player's turn
    if (!this._currentCard) {
      this._RoomStatus.setPlayerTurn()
      this._currentCard = card[1]
      //tell caller there is still no winner
      return null
    }
    // if this is neither first card or last card only change the turn
    if (this._currentCard && this._deck.length !== 4) {
      this._RoomStatus.setPlayerTurn()
      //tell caller there is still no winner
      return null
    }
  }
  setWinnerOfBazi() {
    //set the highest card in deck
    var highest = setHighest(this._deck, this._currentHokm, this._currentCard)
    var winnerPlayer = highest[2]
    // find the team which winner player is in
    var winnerTeam = this._GamePlayers.teams.find((team) =>
      team.players.find((player) => player === winnerPlayer)
    )
    winnerTeam.won_bazi++
    var winnnerPlayerIndex = this._GamePlayers.players.map((player) => player.session).indexOf(winnerPlayer)
    this._RoomStatus.setPlayerTurn(winnnerPlayerIndex)
    this.finishBazi()
    if (winnerTeam.won_bazi === 7) {
      this.setWinnerOfDast(winnerTeam)
      // returns winner player an true if bazi is finished
      return [winnerPlayer, true]
    }
    // return winner player and false because bazi is not finished
    return [winnerPlayer, false]
  }
  setWinnerOfDast(winnerTeam) {
    this._GamePlayers.teams = this._GamePlayers.teams.map((team) => Object.assign(team, { won_bazi: 0 }))
    winnerTeam.won_dast++
    this._RoomStatus.setHakem(winnerTeam, this._GamePlayers.players)
    this._RoomStatus.spreadCards(this._GamePlayers.players)
    if (winnerTeam.won_dast === 7) {
      this.setWinnerOfGame(winnerTeam)
    }
  }
  setWinnerOfGame(winnerTeam) {}
  GetState() {
    return {
      deck: this._deck,
      currentHokm: this._currentHokm,
      currentCard: this._currentCard,
    }
  }
}

export { Table }
