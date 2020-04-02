"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function moveCard(game, card, player) {
    player.cards = player.cards.filter(player_card => player_card !== card);
    game.deck.push([...card, player.name]);
}
exports.moveCard = moveCard;
