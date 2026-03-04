/**
 * Shwe Shan Game Engine with 30% House Edge
 */
const SUITS = [
    { s: '', c: 'black' }, { s: '', c: 'red' }, 
    { s: '', c: 'red' }, { s: '', c: 'black' }
];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let currentBet = 500;
let balance = 50000;

function playShweShan() {
    if (balance < currentBet) return alert("လက်ကျန်မလုံလောက်ပါ");

    // AI Logic: ဒိုင်အနိုင်ရရှိမှုနှုန်းကို 30% သတ်မှတ်ခြင်း (Stealth Mode)
    let dealerShouldWin = Math.random() < 0.30; 

    let playerHand = drawCards(2);
    let dealerHand = drawCards(2);

    // ဒိုင်ရှုံးနေပြီး AI က အနိုင်ပေးချင်ရင် ဖဲထပ်ဆွဲခြင်း သို့မဟုတ် ဖဲလဲခြင်း
    if (dealerShouldWin && calculatePoint(dealerHand).total < calculatePoint(playerHand).total) {
        dealerHand = drawCards(2); // ဖဲပြန်ဝေခြင်း (Internal)
    }

    renderHand('player-hand', playerHand);
    renderHand('dealer-hand', dealerHand);

    let pResult = calculatePoint(playerHand);
    let dResult = calculatePoint(dealerHand);

    document.getElementById('player-point').innerText = pResult.total + " မှတ် " + (pResult.mult > 1 ? pResult.mult + " ဆ" : "");
    document.getElementById('dealer-point').innerText = dResult.total + " မှတ် " + (dResult.mult > 1 ? dResult.mult + " ဆ" : "");

    // အနိုင်အရှုံး ဆုံးဖြတ်ခြင်း
    if (dResult.total >= pResult.total) {
        balance -= (currentBet * dResult.mult);
        alert("ဒိုင်စားသွားပါပြီ!");
    } else {
        balance += (currentBet * pResult.mult);
        alert("လူကြီးမင်း နိုင်ပါတယ်!");
    }
    document.getElementById('money').innerText = balance;
}

function drawCards(num) {
    let hand = [];
    for(let i=0; i<num; i++) {
        hand.push({
            v: VALUES[Math.floor(Math.random() * VALUES.length)],
            s: SUITS[Math.floor(Math.random() * SUITS.length)]
        });
    }
    return hand;
}

function calculatePoint(hand) {
    let sum = 0;
    hand.forEach(c => {
        let val = 0;
        if (c.v === 'A') val = 1;
        else if (['10', 'J', 'Q', 'K'].includes(c.v)) val = 0;
        else val = parseInt(c.v);
        sum += val;
    });
    
    let total = sum % 10;
    // အဆတိုးတွက်ချက်ခြင်း (ဥပမာ- အပွင့်တူလျှင် ၂ ဆ)
    let mult = (hand[0].s.s === hand[1].s.s) ? 2 : 1;
    
    return { total, mult };
}

function renderHand(id, hand) {
    let el = document.getElementById(id);
    el.innerHTML = '';
    hand.forEach(c => {
        el.innerHTML += `<div class="card ${c.s.c}"><div>${c.v}</div><div>${c.s.s}</div></div>`;
    });
}
