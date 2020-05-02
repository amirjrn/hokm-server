function moveCard(game, card, player) {

    player.cards = player.cards.filter(player_card => player_card[0] !== card[0] || player_card[1] !== card[1]);
    game.deck.push([...card, player.name]);

}
export { moveCard };