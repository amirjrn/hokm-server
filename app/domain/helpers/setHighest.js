"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortCards_1 = require("./sortCards");
function setHighest(deck, hokm, currentCard) {
    // Filter deck from cards that theirs suit are not either equal to currentCard or hokm;
    var filteredDeck = deck.filter((card) => card[1] === currentCard);
    //filter cards which theirs suit is equal to hokm;
    var hokmsInDeck = deck.filter((card) => card[1] === hokm);
    var Deck = hokmsInDeck.length !== 0 ? sortCards_1.sortCards(hokmsInDeck, false) : sortCards_1.sortCards(filteredDeck, false);
    return Deck[0];
}
exports.setHighest = setHighest;
