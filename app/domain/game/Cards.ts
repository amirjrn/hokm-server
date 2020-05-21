import { shuffle } from './helpers/shuffle'
import Deck from './helpers/Deck'
class Cards {
  private _deck: [number, string][]
  private _dealed_deck_until: number

  private _shuffled_deck: [number, string][]
  get shuffled_deck() {
    return this._shuffled_deck
  }

  constructor({ dealed_deck_until = 0, shuffled_deck = [] } = {}) {
    this._deck = Deck
    this._shuffled_deck = shuffled_deck
    this._dealed_deck_until = dealed_deck_until
  }
  shuffle() {
    this._shuffled_deck = shuffle(this._deck)
  }

  deal() {
    return this._shuffled_deck[this._dealed_deck_until++]
  }
  reset() {
    this._shuffled_deck = []
    this._dealed_deck_until = 0
  }
  GetState() {
    return {
      dealed_deck_until: this._dealed_deck_until,
      shuffled_deck: this._shuffled_deck,
    }
  }
}

export { Cards }
