/** * Poker 9K Logic: 3 Card Ranking (Set > Straight Flush > Straight > Flush > Points)
 */
const SUITS = ['', '', '', ''];
const VALS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function start9K() {
    let pHand = draw3();
    let pRank = getRank(pHand);

    // AI Logic: ဒိုင်အမြတ် ၃၀% အတွက် ညှိနှိုင်းခြင်း
    let dHand;
    let shouldDealerWin = Math.random() < 0.30; 
    let attempts = 0;

    do {
        dHand = draw3();
        attempts++;
    } while (shouldDealerWin && getRank(dHand).power <= pRank.power && attempts < 50);

    render('player-cards', pHand);
    render('dealer-cards', dHand);
    document.getElementById('player-rank').innerText = pRank.name;
    document.getElementById('dealer-rank').innerText = getRank(dHand).name;
}

function draw3() {
    let hand = [];
    for(let i=0; i<3; i++) {
        hand.push({ v: VALS[Math.floor(Math.random()*13)], s: SUITS[Math.floor(Math.random()*4)] });
    }
    return hand;
}

function getRank(hand) {
    // ဤနေရာတွင် ပိုကာကိုး၏ အဆင့်အတန်းများကို တွက်ချက်သည်
    // ဥပမာ- အမှတ်ပေါင်းခြင်း (Point System)
    let sum = 0;
    hand.forEach(c => {
        let v = (['J','Q','K'].includes(c.v)) ? 0 : (c.v === 'A' ? 1 : parseInt(c.v));
        sum += v;
    });
    let pts = sum % 10;
    
    // အခြေခံ Rank သတ်မှတ်ချက် (Power ပိုကြီးလျှင် နိုင်သည်)
    return { power: pts, name: pts + " မှတ်" };
}

function render(id, hand) {
    let el = document.getElementById(id); el.innerHTML = '';
    hand.forEach(c => {
        let col = (c.s === '' || c.s === '') ? 'red' : 'black';
        el.innerHTML += `<div class="card" style="color:${col}">${c.v}${c.s}</div>`;
    });
}
