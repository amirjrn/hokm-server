import { setHighest } from './helpers/setHighest'
import { moveCard } from './helpers/moveCard'
import { GamePlayers } from './GamePlayers'
class Table {
  private _GamePlayers: GamePlayers

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

  constructor({ GamePlayers, deck, currentHokm, currentCard }) {
    this._GamePlayers = GamePlayers
    this._deck = deck
    this._currentHokm = currentHokm
    this._currentCard = currentCard
  }

  hokm(suit, name) {
    if (this._GamePlayers.hakem !== name) {
      throw new Error('شما حاکم نیستید')
    }
    this._currentHokm = suit
  }
  finishBazi() {
    this._currentCard = null
    this._deck = []
  }
  playCard(card, name: string) {
    var player = this._GamePlayers.players.find(
      (player) => player.name === name
    )
    if (!player) {
      return new Error('you can not send card to this room')
    }
    if (
      this._GamePlayers.players[this._GamePlayers._playerTurn].name !== name
    ) {
      return new Error('it is not your turn')
    }
    if (
      !player.cards.find(
        (playerCard) => playerCard[0] === card[0] && playerCard[1] === card[1]
      )
    ) {
      return new Error("you don't have this card")
    }
    if (
      this._currentCard &&
      player.cards.find((playerCard) => playerCard[1] === this._currentCard) &&
      this._currentCard !== card[1]
    ) {
      return new Error('please play current card')
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
      this._GamePlayers.setPlayerTurn()
      this._currentCard = card[1]
      return null
    }
    // if this is neither first card or last card only change the turn
    if (this._currentCard && this._deck.length !== 4) {
      this._GamePlayers.setPlayerTurn()
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
    var winnnerPlayerIndex = this._GamePlayers.players
      .map((e) => e.name)
      .indexOf(winnerPlayer)
    this._GamePlayers.setPlayerTurn(winnnerPlayerIndex)
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
    this._GamePlayers.teams = this._GamePlayers.teams.map((team) =>
      Object.assign(team, { won_bazi: 0 })
    )
    winnerTeam.won_dast++
    this._GamePlayers.setHakem(winnerTeam)
    this._GamePlayers.spreadCards()
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
