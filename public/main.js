
var socket = io.connect('http://localhost:3000/');
// listening to click event and when happens sends a chat event to server which is listening for chat event
var cards_element = document.getElementById('cards');
var deck_element = document.getElementById('deck');
cards_element.addEventListener('click', function (e) {
    card = e.target;
    socket.emit('playcard', {
        number: card.dataset.number,
        suit: card.dataset.suit
    })
});
socket.on('hi', function (data) {
    console.log(data);

});
//listen to chat events sent from server
socket.on('getcards', function (data) {
    var cards = data;
    console.log(cards);
    cards.map(card => {
        var node = document.createElement("LI");
        var img = document.createElement("IMG");
        img.src = `"images/${card.suit + card.value}.png"`;
        node.appendChild(img);
        node.dataset.number = card.value;
        node.dataset.suit = card.suit;
        cards_element.appendChild(node);

    }
    )

})

var deck;
socket.on('deck', function (data) {
    deck = data;
    console.log(deck);
    deck_element.innerHTML = '';
    deck.map(card => {
        var node = document.createElement("LI");
        var img = document.createElement("IMG");
        img.src = `"images/${card.suit + card.value}.png`;
        node.appendChild(img);
        node.dataset.number = card.number;
        node.dataset.suit = card.suit;
        deck_element.appendChild(node);
    })

})


