/** * In-Between Logic: Third card must be between the first two.
 * House Edge: 30% control for "Post" (hitting the edge) or "Outside".
 */

let outerCards = [];
const VALS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function dealOuter() {
    outerCards = [getRandomCard(), getRandomCard()];
    // ဖဲနှစ်ချပ် တူနေလျှင် ပြန်ဝေသည်
    if(outerCards[0].p === outerCards[1].p) return dealOuter();
    
    // အငယ်ကို ဘယ်ဘက်၊ အကြီးကို ညာဘက်ထားသည်
    outerCards.sort((a, b) => a.p - b.p);
    
    renderCard('card-left', outerCards[0]);
    renderCard('card-right', outerCards[1]);
    document.getElementById('card-middle').classList.add('hidden');
    document.getElementById('card-middle').innerText = "?";
    
    document.getElementById('deal-btn').classList.add('hide');
    document.getElementById('draw-btn').classList.remove('hide');
    document.getElementById('status-msg').innerText = "ကြားထဲကျမလား? လောင်းပါ";
}

function drawMiddle() {
    let mid = getRandomCard();
    let low = outerCards[0].p;
    let high = outerCards[1].p;

    // AI Logic: ဒိုင်အမြတ် ၃၀% အတွက် ကြားထဲမကျအောင် ညှိခြင်း
    let shouldDealerWin = Math.random() < 0.30;
    if (shouldDealerWin) {
        // ကြားထဲမကျဘဲ အပြင်ထွက်မည့်ဖဲကို ရှာ၍ထုတ်ပေးခြင်း
        while (mid.p > low && mid.p < high) {
            mid = getRandomCard();
        }
    }

    renderCard('card-middle', mid);
    document.getElementById('card-middle').classList.remove('hidden');
    
    let msg = document.getElementById('status-msg');
    if (mid.p > low && mid.p < high) {
        msg.innerText = "လူကြီးမင်း နိုင်ပါတယ်! ";
        msg.style.color = "#2ecc71";
    } else {
        msg.innerText = "ဒိုင်စားသွားပါပြီ! ";
        msg.style.color = "#e74c3c";
    }
    
    document.getElementById('deal-btn').classList.remove('hide');
    document.getElementById('draw-btn').classList.add('hide');
}

function getRandomCard() {
    let idx = Math.floor(Math.random() * 13);
    return { v: VALS[idx], p: idx + 1, s: ['','','',''][Math.floor(Math.random()*4)] };
}

function renderCard(id, card) {
    let el = document.getElementById(id);
    let col = (card.s === '' || card.s === '') ? 'red' : 'black';
    el.innerHTML = `${card.v}<br>${card.s}`;
    el.style.color = col;
}
