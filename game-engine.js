// MoneyBed 3D - Game Engine
let currentDeck = [];
let playerHand = [];

function startGame() {
    console.log("Game Starting...");
    currentDeck = generateDeck(); // game-logic.js ထဲက function ကို ခေါ်သုံးခြင်း
    playerHand = [currentDeck.pop(), currentDeck.pop()];
    
    displayCards(playerHand, 'player-area'); // app-ui.js ထဲက function ကို ခေါ်သုံးခြင်း
    
    const points = getPointValue(playerHand);
    console.log("Current Points: " + points);
}

function hitCard() {
    if (playerHand.length < 3) {
        playerHand.push(currentDeck.pop());
        displayCards(playerHand, 'player-area');
    }
}
