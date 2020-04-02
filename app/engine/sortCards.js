function sortCards(arrayToSort, bySuit) {
    var sorted_deck = arrayToSort.sort(function (a, b) {
        return b[0] - a[0];
    });
    if (bySuit) {
        var suits = ["del", "khaj", "khesht", "pik"];
        var sorted_deck = [];
        suits.forEach(suit => {
            var sliced_array = arrayToSort.filter(card => card[1] === suit);
            var sorted_sliced_array = sliced_array.sort(function (a, b) {
                b[0] - a[0];
            });
            sorted_deck.push(...sorted_sliced_array);
        });
    }
    return sorted_deck;
}
module.exports = sortCards;