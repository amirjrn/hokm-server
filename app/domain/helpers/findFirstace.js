"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findFirstَََAce(shuffled_cards) {
    var player_turn = 0;
    var hakemIndex;
    (function findFirstَََAceInner() {
        var card = shuffled_cards.deal();
        var hakem = card[0] === 13 ? player_turn : null;
        if (hakem !== null) {
            hakemIndex = hakem;
            return;
        }
        player_turn = player_turn === 3 ? 0 : ++player_turn;
        findFirstَََAceInner();
    })();
    return hakemIndex;
}
exports.findFirstَََAce = findFirstَََAce;
