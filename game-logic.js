const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardSuits = ['♠', '♥', '♦', '♣'];

function generateDeck() {
    let deck = [];
    cardSuits.forEach(suit => {
        cardValues.forEach(val => {
            deck.push({ suit: suit, value: val });
        });
    });
    return deck.sort(() => Math.random() - 0.5);
}

function calculatePoints(hand) {
    let total = 0;
    hand.forEach(card => {
        if (['J', 'Q', 'K', '10'].includes(card.value)) total += 0;
        else if (card.value === 'A') total += 1;
        else total += parseInt(card.value);
    });
    return total % 10;
}
