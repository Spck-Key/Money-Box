/** * Hulu Cock Logic: 3 Symbol Dice.
 * House Edge: 30% control to avoid player's chosen symbol.
 *
 */

const SYMBOLS = ['', '', '', '', '', ''];

function playHulu(choice) {
    let r1, r2, r3;
    let shouldDealerWin = Math.random() < 0.30; // ၃၀% ဒိုင်အမြတ်

    function roll() {
        r1 = SYMBOLS[Math.floor(Math.random() * 6)];
        r2 = SYMBOLS[Math.floor(Math.random() * 6)];
        r3 = SYMBOLS[Math.floor(Math.random() * 6)];
    }

    roll();

    if (shouldDealerWin) {
        // Player ရွေးထားသော အရုပ်မထွက်အောင် (သို့မဟုတ်) အထွက်နည်းအောင် AI က ထိန်းချုပ်ခြင်း
        while (r1 === choice || r2 === choice || r3 === choice) {
            roll();
        }
    }

    document.getElementById('h1').innerText = r1;
    document.getElementById('h2').innerText = r2;
    document.getElementById('h3').innerText = r3;

    const status = document.getElementById('status');
    if (r1 === choice || r2 === choice || r3 === choice) {
        let count = [r1, r2, r3].filter(x => x === choice).length;
        status.innerText = `လူကြီးမင်း (${count}) ဆ နိုင်ပါသည်! `;
        status.style.color = "#2ecc71";
    } else {
        status.innerText = "ဒိုင်စားသွားပါပြီ! ";
        status.style.color = "#e74c3c";
    }
}
