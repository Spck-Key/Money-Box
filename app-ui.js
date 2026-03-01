function displayCards(hand, elementId) {
    const container = document.getElementById(elementId);
    if(!container) return;
    container.innerHTML = '';
    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-3d';
        cardDiv.innerText = `${card.value}\n${card.suit}`;
        container.appendChild(cardDiv);
    });
}

function updateStatus(msg) {
    const statusBox = document.getElementById('game-status');
    if(statusBox) statusBox.innerText = msg;
}
