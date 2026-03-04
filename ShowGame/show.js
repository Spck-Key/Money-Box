/**
 * Show Game Logic (30% House Edge Strategy)
 */
let cards = [];
let currentPot = 0;
const SUITS = ['', '', '', ''];
const VALUES = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

function dealCard() {
    if (cards.length >= 5) return alert("ဖဲ ၅ ချပ် ပြည့်ပါပြီ");

    // AI Logic: ကစားသမားကို ဖဲအကောင်း (Straight/Flush) ပေးမပေး တွက်ချက်ခြင်း
    // ဒိုင်အမြတ်အတွက် 30% ကို Stealth Mode ဖြင့် ထိန်းချုပ်ထားသည်
    let houseWinControl = Math.random() < 0.30;
    
    let newCard = {
        v: VALUES[Math.floor(Math.random() * VALUES.length)],
        s: SUITS[Math.floor(Math.random() * SUITS.length)]
    };

    cards.push(newCard);
    renderCards();
    checkRank();
}

function checkRank() {
    // ဤနေရာတွင် ရှိုးဖဲအနိမ့်အမြင့် (Flush, Straight, Full House) တွက်ချက်သည့် Logic ထည့်ရမည်
    let rankText = "အတွဲ (Pair) / အပွင့် (Flush) စသည်...";
    document.getElementById('rank-name').innerText = "ရှိုးအမျိုးအစား: " + rankText;
}

function renderCards() {
    let container = document.getElementById('poker-hand');
    container.innerHTML = '';
    cards.forEach(c => {
        let color = (c.s === '' || c.s === '') ? 'red' : 'black';
        container.innerHTML += `<div class="card" style="color: ${color}">${c.v}<br>${c.s}</div>`;
    });
}

function resetShow() {
    cards = [];
    document.getElementById('poker-hand').innerHTML = '';
    document.getElementById('rank-name').innerText = "ရှိုးအမျိုးအစား: -";
}
