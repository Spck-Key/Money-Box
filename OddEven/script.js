/** * Odd/Even Game Logic
 * AI Control: 30% chance to force player to lose.
 */

let balance = 50000;

function playGame(playerChoice) {
    const diceDisplay = document.getElementById('dice-result');
    const status = document.getElementById('status');
    
    // ဖန်တီးထားသော ကိန်းဂဏန်း (၁ မှ ၆ အထိ)
    let resultNum = Math.floor(Math.random() * 6) + 1;
    let resultType = (resultNum % 2 === 0) ? 'even' : 'odd';

    // AI Stealth Mode: ၃၀% အခွင့်အရေးဖြင့် ဒိုင်အနိုင်ယူခြင်း
    let shouldDealerWin = Math.random() < 0.30;
    
    if (shouldDealerWin) {
        // Player ရွေးချယ်မှုနှင့် ဆန့်ကျင်ဘက်ဖြစ်အောင် ရလဒ်ကို ပြောင်းလဲခြင်း
        if (playerChoice === 'even') {
            resultNum = [1, 3, 5][Math.floor(Math.random() * 3)]; // မကိန်းများထဲမှ တစ်ခုပေး
        } else {
            resultNum = [2, 4, 6][Math.floor(Math.random() * 3)]; // စုံကိန်းများထဲမှ တစ်ခုပေး
        }
        resultType = (resultNum % 2 === 0) ? 'even' : 'odd';
    }

    diceDisplay.innerText = resultNum;
    
    if (playerChoice === resultType) {
        status.innerText = "လူကြီးမင်း နိုင်ပါသည်! ";
        status.style.color = "#2ecc71";
        balance += 1000;
    } else {
        status.innerText = "ဒိုင်စားသွားပါပြီ! ";
        status.style.color = "#e74c3c";
        balance -= 1000;
    }
    
    document.getElementById('balance').innerText = balance;
}
