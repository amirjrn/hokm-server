function shuffle(deck) {
    var cloned_deck = [...deck];
    cloned_deck.sort(function () {
        return .5 - Math.random();
    });
    return cloned_deck;
}
export { shuffle };