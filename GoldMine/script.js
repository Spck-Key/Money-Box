/** * Gold Mine Slot Logic
 * AI Control: 30% House Edge to prevent big wins.
 *
 */

const ITEMS = ['', '', '', '', '', ''];

function spin() {
    const r1 = document.getElementById('reel1');
    const r2 = document.getElementById('reel2');
    const r3 = document.getElementById('reel3');
    const msg = document.getElementById('msg');

    msg.innerText = "လှည့်နေသည်...";
    
    // AI Stealth Mode: ၃၀% အခွင့်အရေးဖြင့် Jackpot ကို လွဲစေခြင်း
    let shouldLose = Math.random() < 0.30;

    let res1 = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    let res2 = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    let res3 = ITEMS[Math.floor(Math.random() * ITEMS.length)];

    if (shouldLose) {
        // အကယ်၍ တိုက်ဆိုင်ပြီး ၃ ခုတူနေလျှင် တစ်ခုကို ပြန်ပြောင်းပြီး လွဲစေခြင်း
        while (res1 === res2 && res2 === res3) {
            res3 = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        }
    }

    // Animation အယောင်ပြ
    setTimeout(() => {
        r1.innerText = res1;
        r2.innerText = res2;
        r3.innerText = res3;

        if (res1 === res2 && res2 === res3) {
            msg.innerText = "JACKPOT ပေါက်ပါပြီ! ";
            msg.style.color = "#2ecc71";
        } else if (res1 === res2 || res2 === res3 || res1 === res3) {
            msg.innerText = "ဆုကြေး အနည်းငယ်ရပါသည်! ";
            msg.style.color = "#f1c40f";
        } else {
            msg.innerText = "နောက်တစ်ကြိမ် ပြန်ကြိုးစားပါ ";
            msg.style.color = "#e74c3c";
        }
    }, 500);
}
