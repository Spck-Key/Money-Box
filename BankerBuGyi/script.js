/** * Banker BuGyi Logic: 5 Cards 
 * Special: Banker Wins x3 on BuGyi (10 pts)
 * Control: 30% Dealer Edge
 */

let tableBet = 1000;
let dealerBalance = 200000; 

function updateInfo() {
    tableBet = parseInt(document.getElementById('bet-select').value);
    document.getElementById('info').innerText = `လိုအပ်ငွေ: ${(tableBet * 50).toLocaleString()} ကျပ်`;
}

function enterGame() {
    if (dealerBalance < (tableBet * 50)) {
        alert("ဒိုင်ကိုင်ရန် ငွေမလောက်ပါ။");
    } else {
        document.getElementById('setup-area').classList.add('hidden');
        document.getElementById('play-area').classList.remove('hidden');
    }
}

function playRound() {
    let pHand = draw5();
    let dHand = draw5();

    // AI Control 30%: ဒိုင်ကို ပိုသာသော ဖဲပေးရန်
    if (Math.random() < 0.30) {
        let pPts = getBuGyiPts(pHand);
        while (getBuGyiPts(dHand) < pPts) {
            dHand = draw5();
        }
    }

    render('p-cards', pHand);
    render('d-cards', dHand);
    
    let pRes = getBuGyiPts(pHand);
    let dRes = getBuGyiPts(dHand);
    
    document.getElementById('p-result').innerText = (pRes === 10) ? "ဘူကြီး!" : pRes + " မှတ်";
    document.getElementById('d-result').innerText = (dRes === 10) ? "ဘူကြီး!" : dRes + " မှတ်";

    settle(pRes, dRes);
}

function draw5() {
    let h = [];
    const V = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    for(let i=0; i<5; i++) h.push({v: V[Math.floor(Math.random()*13)], s: ['','','',''][Math.floor(Math.random()*4)]});
    return h;
}

function getBuGyiPts(hand) {
    let total = 0;
    hand.forEach(c => {
        let val = (['10','J','Q','K'].includes(c.v)) ? 10 : (c.v === 'A' ? 1 : parseInt(c.v));
        total += val;
    });
    let pts = total % 10;
    return (pts === 0) ? 10 : pts;
}

function settle(p, d) {
    let amount = tableBet;
    if (d > p) {
        // ဒိုင်နိုင်လျှင် - ဘူကြီး (၁၀ မှတ်) အတွက် ၃ ဆ စားသည်
        if (d === 10) amount *= 3;
        else if (d >= 7) amount *= 2;
        
        let comm = amount * 0.05; // ၅% ကော်မရှင်
        dealerBalance += (amount - comm);
    } else if (p > d) {
        if (p === 10) amount *= 3;
        dealerBalance -= amount;
    }
}

function render(id, hand) {
    let el = document.getElementById(id); el.innerHTML = '';
    hand.forEach(c => {
        let col = (c.s === '' || c.s === '') ? 'red' : 'black';
        el.innerHTML += `<div class="card" style="color:${col}">${c.v}${c.s}</div>`;
    });
}
