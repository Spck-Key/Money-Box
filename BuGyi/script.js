/** * BuGyi 5-Card Logic: 3 cards must make 10/20/30. 
 * Remaining 2 cards define the score.
 */

function startDeal() {
    let pHand = generateHand();
    let pResult = calculateBuGyi(pHand);

    // AI Stealth Logic: 30% chance to ensure Dealer wins
    let dHand;
    let shouldDealerWin = Math.random() < 0.30;
    let attempts = 0;

    do {
        dHand = generateHand();
        attempts++;
    } while (shouldDealerWin && calculateBuGyi(dHand).score <= pResult.score && attempts < 50);

    renderCards('player-cards', pHand);
    renderCards('dealer-cards', dHand);
    
    document.getElementById('player-result').innerText = pResult.label;
    document.getElementById('dealer-result').innerText = calculateBuGyi(dHand).label;
}

function generateHand() {
    let hand = [];
    let suits = ['','','',''];
    let vals = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    for(let i=0; i<5; i++) {
        hand.push({
            v: vals[Math.floor(Math.random() * vals.length)],
            s: suits[Math.floor(Math.random() * suits.length)]
        });
    }
    return hand;
}

function calculateBuGyi(hand) {
    let best = { score: -1, label: "မှတ်မရှိ" };
    
    // ၅ ချပ်ထဲမှ ၃ ချပ်ကို ပေါင်းစပ်ကြည့်ခြင်း
    for (let i=0; i<5; i++) {
        for (let j=i+1; j<5; j++) {
            for (let k=j+1; k<5; k++) {
                let sum3 = getVal(hand[i]) + getVal(hand[j]) + getVal(hand[k]);
                if (sum3 % 10 === 0) {
                    let others = [];
                    for(let x=0; x<5; x++) if(x!==i && x!==j && x!==k) others.push(hand[x]);
                    let score = (getVal(others[0]) + getVal(others[1])) % 10;
                    if (score === 0) score = 10;
                    if (score > best.score) {
                        best = { score: score, label: score === 10 ? "ဘူကြီး!" : score + " မှတ်" };
                    }
                }
            }
        }
    }
    return best;
}

function getVal(card) {
    if (['J','Q','K'].includes(card.v)) return 10;
    if (card.v === 'A') return 1;
    return parseInt(card.v);
}

function renderCards(id, hand) {
    let el = document.getElementById(id);
    el.innerHTML = '';
    hand.forEach(c => {
        let color = (c.s === '' || c.s === '') ? 'red' : 'black';
        el.innerHTML += `<div class="card" style="color:${color}">${c.v}${c.s}</div>`;
    });
}
