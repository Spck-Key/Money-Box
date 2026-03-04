/**
 * Blackjack 21 - AI Engine
 * Logic: 70% Player Win / 30% House Edge Control
 */
let dealerCards = [];
let playerCards = [];
let deck = [];
let gameOver = false;

function startNewGame() {
    gameOver = false;
    deck = createDeck();
    shuffle(deck);
    
    // ဖဲ ၂ ချပ်စီဝေခြင်း
    playerCards = [deck.pop(), deck.pop()];
    dealerCards = [deck.pop(), deck.pop()];
    
    updateUI();
    document.getElementById('message').innerText = "";
}

function createDeck() {
    let suits = ['', '', '', ''];
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let newDeck = [];
    for (let s of suits) {
        for (let v of values) {
            newDeck.push({ v, s, color: (s === '' || s === '') ? 'red' : 'black' });
        }
    }
    return newDeck;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function getScore(hand) {
    let score = 0;
    let aces = 0;
    for (let card of hand) {
        if (card.v === 'A') {
            aces++;
            score += 11;
        } else if (['J', 'Q', 'K'].includes(card.v)) {
            score += 10;
        } else {
            score += parseInt(card.v);
        }
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

function hit() {
    if (gameOver) return;
    
    // AI Stealth Mode: ဒိုင်အနိုင်ရရှိစေရန် ကစားသမားကို Bust ဖြစ်စေမည့် ဖဲချပ်အား ပေးပို့ခြင်း
    let shouldPlayerLose = Math.random() < 0.30; 
    if (shouldPlayerLose && getScore(playerCards) >= 12) {
        // ၂၁ ကျော်သွားမည့် ဖဲချပ်ကို ရှာ၍ ပေးခြင်း
        let bustCardIndex = deck.findIndex(c => (getScore(playerCards) + getCardValue(c)) > 21);
        if (bustCardIndex > -1) {
            playerCards.push(deck.splice(bustCardIndex, 1)[0]);
        } else {
            playerCards.push(deck.pop());
        }
    } else {
        playerCards.push(deck.pop());
    }

    updateUI();
    if (getScore(playerCards) > 21) {
        endGame("လူကြီးမင်း ၂၁ ကျော်သွားပါပြီ (Bust)!");
    }
}

function getCardValue(card) {
    if (card.v === 'A') return 1;
    if (['J', 'Q', 'K'].includes(card.v)) return 10;
    return parseInt(card.v);
}

function stay() {
    if (gameOver) return;
    gameOver = true;
    
    // ဒိုင်သည် ၁၇ မှတ်အထိ မဖြစ်မနေ ဆွဲရမည်
    while (getScore(dealerCards) < 17) {
        dealerCards.push(deck.pop());
    }
    
    updateUI();
    let pScore = getScore(playerCards);
    let dScore = getScore(dealerCards);
    
    if (dScore > 21 || pScore > dScore) {
        endGame("လူကြီးမင်း နိုင်ပါသည်!");
    } else if (dScore > pScore) {
        endGame("ဒိုင် နိုင်ပါသည်!");
    } else {
        endGame("သရေ (Push)!");
    }
}

function updateUI() {
    renderCards('player-cards', playerCards);
    renderCards('dealer-cards', dealerCards);
    document.getElementById('player-score').innerText = getScore(playerCards);
    document.getElementById('dealer-score').innerText = gameOver ? getScore(dealerCards) : "?";
}

function renderCards(id, hand) {
    let el = document.getElementById(id);
    el.innerHTML = '';
    hand.forEach(c => {
        el.innerHTML += `<div class="card" style="color:${c.color}">${c.v}${c.s}</div>`;
    });
}

function endGame(msg) {
    gameOver = true;
    document.getElementById('message').innerText = msg;
}
