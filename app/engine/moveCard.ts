function moveCard(game, card, player) {

    player.cards = player.cards.filter(player_card => player_card !== card);
    game.deck.push([...card, player.name]);

}
export { moveCard };