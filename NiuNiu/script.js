/** * Niu Niu Logic: 5 Cards. 3 cards must sum to 10/20/30.
 * The remaining 2 cards determine the "Niu" rank.
 *
 */

const VALS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function startNiuNiu() {
    let pHand = draw5();
    let pRes = calculateNiu(pHand);

    // AI Stealth: 30% chance to force Dealer win
    let dHand;
    let shouldDealerWin = Math.random() < 0.30;
    let attempts = 0;

    do {
        dHand = draw5();
        attempts++;
    } while (shouldDealerWin && calculateNiu(dHand).power <= pRes.power && attempts < 50);

    render('player-hand', pHand);
    render('dealer-hand', dHand);
    document.getElementById('player-result').innerText = pRes.label;
    document.getElementById('dealer-result').innerText = calculateNiu(dHand).label;
}

function draw5() {
    let h = [];
    for(let i=0; i<5; i++) h.push({v: VALS[Math.floor(Math.random()*13)], s: ['','','',''][Math.floor(Math.random()*4)]});
    return h;
}

function calculateNiu(hand) {
    let bestPower = -1;
    let label = "မှတ်မရှိ (No Niu)";

    for (let i=0; i<5; i++) {
        for (let j=i+1; j<5; j++) {
            for (let k=j+1; k<5; k++) {
                let s3 = getV(hand[i]) + getV(hand[j]) + getV(hand[k]);
                if (s3 % 10 === 0) {
                    let others = [];
                    for(let x=0; x<5; x++) if(x!==i && x!==j && x!==k) others.push(hand[x]);
                    let pts = (getV(others[0]) + getV(others[1])) % 10;
                    let pwr = (pts === 0) ? 10 : pts;
                    if (pwr > bestPower) {
                        bestPower = pwr;
                        label = (pwr === 10) ? "နွားနွား (Niu Niu)!" : "နွား " + pwr;
                    }
                }
            }
        }
    }
    return { power: bestPower, label: label };
}

function getV(c) {
    if (['J','Q','K'].includes(c.v)) return 10;
    return (c.v === 'A') ? 1 : parseInt(c.v);
}

function render(id, hand) {
    let el = document.getElementById(id); el.innerHTML = '';
    hand.forEach(c => {
        let col = (c.s === '' || c.s === '') ? 'red' : 'black';
        el.innerHTML += `<div class="card" style="color:${col}">${c.v}${c.s}</div>`;
    });
}
