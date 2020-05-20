import { shuffle } from './helpers/shuffle'
class Deck {
  deck: Array<number | string>[]
  dealed_deck: Array<number | string>[]
  shuffled_deck: Array<number | string>[]
  constructor({ dealed_deck = [], shuffled_deck = [] } = {}) {
    this.deck = [
      [1, 'khaj'],
      [2, 'khaj'],
      [3, 'khaj'],
      [4, 'khaj'],
      [5, 'khaj'],
      [6, 'khaj'],
      [7, 'khaj'],
      [8, 'khaj'],
      [9, 'khaj'],
      [10, 'khaj'],
      [11, 'khaj'],
      [12, 'khaj'],
      [13, 'khaj'],
      [1, 'del'],
      [2, 'del'],
      [3, 'del'],
      [4, 'del'],
      [5, 'del'],
      [6, 'del'],
      [7, 'del'],
      [8, 'del'],
      [9, 'del'],
      [10, 'del'],
      [11, 'del'],
      [12, 'del'],
      [13, 'del'],
      [1, 'pik'],
      [2, 'pik'],
      [3, 'pik'],
      [4, 'pik'],
      [5, 'pik'],
      [6, 'pik'],
      [7, 'pik'],
      [8, 'pik'],
      [9, 'pik'],
      [10, 'pik'],
      [11, 'pik'],
      [12, 'pik'],
      [13, 'pik'],
      [1, 'khesht'],
      [2, 'khesht'],
      [3, 'khesht'],
      [4, 'khesht'],
      [5, 'khesht'],
      [6, 'khesht'],
      [7, 'khesht'],
      [8, 'khesht'],
      [9, 'khesht'],
      [10, 'khesht'],
      [11, 'khesht'],
      [12, 'khesht'],
      [13, 'khesht'],
    ]
    this.shuffled_deck = shuffled_deck
    this.dealed_deck = dealed_deck
  }
  shuffle() {
    this.shuffled_deck = shuffle(this.deck)
  }

  deal() {
    this.dealed_deck.push(this.shuffled_deck.pop())
    return this.dealed_deck[this.dealed_deck.length - 1]
  }
  reset() {
    this.shuffled_deck = []
    this.dealed_deck = []
  }
  GetState() {
    return {
      dealed_deck: this.dealed_deck,
      shuffled_deck: this.shuffled_deck,
    }
  }
}

export { Deck }
