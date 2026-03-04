/** * Banker Shan Logic: Win rate 30% control + 5% Commission
 * Bankroll: 50x of Minimum Bet
 */

let currentTable = 1000;
let userBalance = 150000; // ဥပမာ ဒိုင်၏ လက်ကျန်ငွေ
const VALS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function updateRequirement() {
    currentTable = parseInt(document.getElementById('table-select').value);
    let require = currentTable * 50;
    document.getElementById('require-msg').innerText = `ဒိုင်ကိုင်ရန် အနည်းဆုံး: ${require.toLocaleString()} ကျပ် လိုအပ်သည်`;
}

function checkAndStart() {
    let require = currentTable * 50;
    if (userBalance < require) {
        alert("ငွေမလောက်ပါ။ အနည်းဆုံး " + require + " ကျပ် ရှိရပါမည်။");
    } else {
        document.getElementById('setup-area').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
    }
}

function dealCards() {
    let pHand = [draw(), draw()];
    let dHand = [draw(), draw()];

    // AI Control: 30% chance for Dealer to Win
    if (Math.random() < 0.30) {
        while (calcShan(dHand).pts < calcShan(pHand).pts) {
            dHand = [draw(), draw()];
        }
    }

    renderCards('p-cards', pHand);
    renderCards('d-cards', dHand);
    document.getElementById('p-res').innerText = calcShan(pHand).label;
    document.getElementById('d-res').innerText = calcShan(dHand).label;

    settleMoney(calcShan(pHand), calcShan(dHand));
}

function draw() {
    return { v: VALS[Math.floor(Math.random()*13)], s: ['','','',''][Math.floor(Math.random()*4)] };
}

function calcShan(hand) {
    let pts = 0;
    hand.forEach(c => {
        let v = (['10','J','Q','K'].includes(c.v)) ? 0 : (c.v === 'A' ? 1 : parseInt(c.v));
        pts += v;
    });
    pts = pts % 10;
    return { pts: pts, label: pts + " မှတ်" };
}

function settleMoney(pRes, dRes) {
    if (dRes.pts > pRes.pts) {
        let win = currentTable;
        let comm = win * 0.05; // ၅% ကော်မရှင်ဖြတ်တောက်ခြင်း
        userBalance += (win - comm);
        console.log("Banker Wins. Commission Taken: " + comm);
    } else if (pRes.pts > dRes.pts) {
        userBalance -= currentTable;
    }
}

function renderCards(id, hand) {
    let el = document.getElementById(id); el.innerHTML = '';
    hand.forEach(c => {
        let col = (c.s === '' || c.s === '') ? 'red' : 'black';
        el.innerHTML += `<div class="card" style="color:${col}">${c.v}${c.s}</div>`;
    });
}
