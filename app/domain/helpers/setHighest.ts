import { sortCards } from './sortCards';
function setHighest(deck, hokm, currentCard) {
    // Filter deck from cards that theirs suit are not either equal to currentCard or hokm;
    var filteredDeck = deck.filter((card) => card[1] === currentCard);
    //filter cards which theirs suit is equal to hokm;
    var hokmsInDeck = deck.filter((card) => card[1] === hokm);
    var Deck = hokmsInDeck.length !== 0 ? sortCards(hokmsInDeck, false) : sortCards(filteredDeck, false);
    return Deck[0];
}
export { setHighest };