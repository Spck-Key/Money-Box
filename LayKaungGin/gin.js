/**
 * Lay Kaung Gin - AI Logic (70/30 Rule)
 */

const GIN_SYMBOLS = ["ကြက်", "ကျား", "ဖား", "ပုဇွန်"]; // လေးကောင်ဂျင် ရုပ်ပုံများ

let ginSettings = {
    houseEdge: 0.30, // ဒိုင်အမြတ် 30%
    playerRTP: 0.70, // ကစားသူနိုင်ခြေ 70%
    pool: 1000000    // လျော်ကြေးရန်ပုံငွေ
};

function playGin(bets) {
    // bets = { "ကြက်": 1000, "ကျား": 500, ... }
    
    let totalBet = Object.values(bets).reduce((a, b) => a + b, 0);
    let adminCut = totalBet * ginSettings.houseEdge;
    ginSettings.pool += (totalBet * ginSettings.playerRTP);

    // AI မှ အနိုင်ရုပ်ကို ရွေးချယ်ခြင်း
    let winningSymbol = "";
    
    // --- AI Stealth Mode ---
    // လောင်းကြေးအများဆုံးဖြစ်နေတဲ့ ရုပ်ကို ရှောင်ပြီး Pool မပြတ်အောင် AI က ထွက်ပေးမည်
    let sortedBets = Object.entries(bets).sort((a, b) => b[1] - a[1]); // လောင်းကြေးအများဆုံးကို အရင်စီသည်
    
    if (ginSettings.pool < totalBet * 3) {
        // Pool နည်းနေလျှင် လောင်းကြေးအနည်းဆုံး (သို့မဟုတ်) လုံးဝမလောင်းထားသည့်ရုပ်ကို ထုတ်ပေးမည်
        winningSymbol = sortedBets[sortedBets.length - 1][0]; 
    } else {
        // Pool များနေလျှင် Random ထွက်ပေးမည်
        winningSymbol = GIN_SYMBOLS[Math.floor(Math.random() * 4)];
    }

    let winAmount = (bets[winningSymbol] || 0) * 3; // ၃ ဆ လျော်ကြေး (ရင်းအပါ ၄ ဆ)
    ginSettings.pool -= winAmount;

    return {
        result: winningSymbol,
        payout: winAmount,
        adminProfit: adminCut
    };
}
