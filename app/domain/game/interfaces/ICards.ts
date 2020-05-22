export default interface ICards {
  shuffled_deck: [number, string][]
  deal: () => [number, string]
  shuffle: () => [number, string][]
  reset: () => void
}
