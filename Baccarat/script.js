/** * Baccarat Logic: 9 is the highest point.
 * 10, J, Q, K = 0 points. Ace = 1 point.
 * House Edge: 30% control for Banker/Tie outcomes.
 */

function playBaccarat(betOn) {
    let pCards = [draw(), draw()];
    let bCards = [draw(), draw()];

    // AI Stealth Mode: ဒိုင်အမြတ် ၃၀% အတွက် ရလဒ်ကို ကြိုတင်ညှိခြင်း
    let shouldBankerWin = Math.random() < 0.30;
    
    if (shouldBankerWin && betOn === 'player') {
        while (calc(bCards) <= calc(pCards)) {
            bCards = [draw(), draw()];
        }
    }

    render('player-cards', pCards);
    render('banker-cards', bCards);
    
    let pScore = calc(pCards);
    let bScore = calc(bCards);
    
    document.getElementById('player-score').innerText = pScore;
    document.getElementById('banker-score').innerText = bScore;

    determineWinner(pScore, bScore, betOn);
}

function draw() {
    const vals = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    const suits = ['','','',''];
    return {
        v: vals[Math.floor(Math.random()*13)],
        s: suits[Math.floor(Math.random()*4)]
    };
}

function calc(hand) {
    let sum = 0;
    hand.forEach(c => {
        if (['10','J','Q','K'].includes(c.v)) sum += 0;
        else if (c.v === 'A') sum += 1;
        else sum += parseInt(c.v);
    });
    return sum % 10;
}

function render(id, hand) {
    let el = document.getElementById(id); el.innerHTML = '';
    hand.forEach(c => {
        let col = (c.s === '' || c.s === '') ? 'red' : 'black';
        el.innerHTML += `<div class="card" style="color:${col}">${c.v}${c.s}</div>`;
    });
}

function determineWinner(p, b, bet) {
    let win = (p > b) ? 'player' : (b > p ? 'banker' : 'tie');
    let msg = document.getElementById('result-status');
    
    if (bet === win) {
        msg.innerText = "လူကြီးမင်း နိုင်ပါသည်! ";
        msg.style.color = "#2ecc71";
    } else {
        msg.innerText = "ဒိုင်စားသွားပါပြီ! ";
        msg.style.color = "#e74c3c";
    }
}
