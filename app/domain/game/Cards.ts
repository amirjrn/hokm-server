import { shuffle } from './helpers/shuffle'
import Deck from './helpers/Deck'
class Cards {
  private _deck: [number, string][]
  private _dealed_deck_tracker: number

  private _shuffled_deck: [number, string][]
  get shuffled_deck() {
    return this._shuffled_deck
  }

  private _dealed_deck: [number, string][]
  get dealed_deck() {
    return this._dealed_deck
  }
  constructor({ dealed_deck_tracker = 0, shuffled_deck = [] } = {}) {
    this._deck = Deck
    this._shuffled_deck = shuffled_deck
    this._dealed_deck_tracker = dealed_deck_tracker
    this._dealed_deck = []
  }
  shuffle() {
    return (this._shuffled_deck = shuffle(this._deck))
  }

  deal() {
    // return the last card and then increment the dealed deck tracker
    this.dealed_deck.push(this._shuffled_deck[this._dealed_deck_tracker++])
    return this.dealed_deck[this.dealed_deck.length - 1]
  }
  reset() {
    this._shuffled_deck = []
    this._dealed_deck = []
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
