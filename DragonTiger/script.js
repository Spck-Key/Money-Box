/** * Dragon Tiger AI Engine 
 * Logic: King is highest (13), Ace is lowest (1).
 * House Edge: 30% control via Tie or Opponent high card.
 */
const VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const SUITS = ['♠', '♥', '♦', '♣'];

function playGame(playerChoice) {
    let dragon = drawCard();
    let tiger = drawCard();

    // AI Stealth Logic: ဒိုင်အမြတ် ၃၀% အတွက် ညှိယူခြင်း
    let shouldHouseWin = Math.random() < 0.30;
    
    if (shouldHouseWin) {
        // Player ရွေးထားတာနဲ့ ဆန့်ကျင်ဘက်ကို အနိုင်ပေးခြင်း သို့မဟုတ် သရေချခြင်း
        if (playerChoice === 'dragon') {
            while (tiger.power <= dragon.power) tiger = drawCard();
        } else if (playerChoice === 'tiger') {
            while (dragon.power <= tiger.power) dragon = drawCard();
        } else if (playerChoice === 'tie') {
            while (dragon.power === tiger.power) dragon = drawCard();
        }
    }

    renderCard('dragon-card', dragon);
    renderCard('tiger-card', tiger);
    determineWinner(dragon, tiger, playerChoice);
}

function drawCard() {
    let vIdx = Math.floor(Math.random() * 13);
    return {
        v: VALUES[vIdx],
        s: SUITS[Math.floor(Math.random() * 4)],
        power: vIdx + 1,
        color: (Math.random() > 0.5) ? 'red' : 'black'
    };
}

function renderCard(id, card) {
    let el = document.getElementById(id);
    el.style.color = (card.s === '♥' || card.s === '♦') ? 'red' : 'black';
    el.innerHTML = `${card.v}<br>${card.s}`;
}

function determineWinner(d, t, choice) {
    let win = "";
    if (d.power > t.power) win = "dragon";
    else if (t.power > d.power) win = "tiger";
    else win = "tie";

    let msg = document.getElementById('result-msg');
    if (choice === win) {
        msg.innerText = "လူကြီးမင်း နိုင်ပါတယ်! 🎉";
        msg.style.color = "#2ecc71";
    } else {
        msg.innerText = "ဒိုင်စားသွားပါပြီ! 💸";
        msg.style.color = "#e74c3c";
    }
}
