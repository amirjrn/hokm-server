import { shuffle } from './helpers/shuffle'
import Deck from './helpers/Deck'
class Cards {
  private _deck: [number, string][]
  private _dealed_deck_tracker: number

  private _shuffled_deck: [number, string][]
  get shuffled_deck() {
    return this._shuffled_deck
  }

  constructor({ dealed_deck_tracker = 0, shuffled_deck = [] } = {}) {
    this._deck = Deck
    this._shuffled_deck = shuffled_deck
    this._dealed_deck_tracker = dealed_deck_tracker
  }
  shuffle() {
    return (this._shuffled_deck = shuffle(this._deck))
  }

  deal() {
    // return the last card and then increment the dealed deck tracker
    return this._shuffled_deck[this._dealed_deck_tracker++]
  }
  reset() {
    this._shuffled_deck = []
    this._dealed_deck_tracker = 0
  }
  GetState() {
    return {
      dealed_deck_tracker: this._dealed_deck_tracker,
      shuffled_deck: this._shuffled_deck,
    }
  }
}

export { Cards }
