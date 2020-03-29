function main(shuffled_cards, players, io) {
    var player_turn = 0;
    var hakemIndex;
    (function findFirstَََAce() {
        var card = shuffled_cards.deal();
        io.to(players[player_turn].socket_id).emit('new-hakem-card', card);
        var hakem = card[0] === 13 ? player_turn : null;
        if (hakem !== null) {

            hakemIndex = hakem;
            var hakemName = players[hakem].name;
            players.map(player => io.to(player.socket_id).emit('taeen-hakem', hakemName))
            return
        }
        player_turn = player_turn === 3 ? 0 : ++player_turn;
        findFirstَََAce();
    })();

    return hakemIndex;
}
module.exports = main;