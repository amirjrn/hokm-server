function sortCards(arrayToSort) {
    var sorted_deck = arrayToSort.sort(function (a, b) {
        return b[0] - a[0];
    });
    return sorted_deck;
}
module.exports = sortCards;