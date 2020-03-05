function main(shuffled_cards) {
    var player_turn = 0;
    var hakemIndex;
    function findFirstَََAce() {
        var card = shuffled_cards.deal();
        var hakem = card[0] === 13 ? player_turn : null;
        if (hakem !== null) {
            hakemIndex = hakem;
            return
        }
        player_turn = player_turn === 3 ? 0 : ++player_turn;
        findFirstَََAce();
    }
    findFirstَََAce();
    return hakemIndex;
}
module.exports = main;