/**
 * Fish Hunter - AI Logic
 * 70/30 RTP System (70% Player / 30% House)
 */

// ၁။ ငါးအမျိုးအစားနှင့် လျော်ကြေး (Paytable)
const FISH_TYPES = [
    { name: "ငါးအသေး", mult: 2, chance: 0.4 },    // ၄၀% မိနိုင်ခြေ
    { name: "ငါးလတ်", mult: 10, chance: 0.1 },    // ၁၀% မိနိုင်ခြေ
    { name: "ငါးကြီး", mult: 50, chance: 0.02 },   // ၂% မိနိုင်ခြေ
    { name: "ရွှေငါး", mult: 100, chance: 0.005 }  // ၀.၅% မိနိုင်ခြေ
];

// ၂။ AI Settings
let fishData = {
    houseEdge: 0.30,  // ဒိုင်အမြတ် 30%
    playerRTP: 0.70,  // ကစားသူနိုင်ခြေ 70%
    currentPool: 1000000 // လျော်ကြေးပေးရန် အိတ်ကပ် (RTP Pool)
};

/**
 * ကျည်ဆန်ပစ်ခတ်ခြင်း (Bullet Firing)
 */
function fireBullet(bulletBet) {
    // ကစားသမားလောင်းကြေးထဲမှ ဒိုင်အမြတ် 30% ကို အရင်ဖြတ်မည်
    let adminProfit = bulletBet * fishData.houseEdge;
    
    // ကျန်တဲ့ 70% ကို လျော်ကြေးပေးရန် Pool ထဲသို့ ထည့်မည်
    fishData.currentPool += (bulletBet * fishData.playerRTP);

    return {
        adminProfit: adminProfit,
        success: true
    };
}

/**
 * ငါးထိမှန်မှုနှင့် အနိုင်အရှုံး စစ်ဆေးခြင်း (Catch Logic)
 */
function checkCatch(bulletBet, selectedFish) {
    let catchProb = selectedFish.chance;

    // --- AI Stealth Mode ---
    // Pool ထဲမှာ ပိုက်ဆံနည်းနေရင် (ဥပမာ ငါးကြီးတစ်ကောင်စာ လျော်ကြေးထက်နည်းရင်)
    // ငါးကို ဖမ်းမမိအောင် Catch Rate ကို အလိုအလျောက် လျှော့ချပစ်မည်
    let potentialWin = bulletBet * selectedFish.mult;
    
    if (fishData.currentPool < potentialWin) {
        catchProb = catchProb * 0.1; // မိနိုင်ခြေကို ၁၀ ဆ ထပ်လျှော့ခြင်း
    }

    // AI မှ ဖမ်းမိ/မမိ ဆုံးဖြတ်ခြင်း
    let isCaught = Math.random() < catchProb;
    let winAmount = 0;

    if (isCaught) {
        winAmount = potentialWin;
        fishData.currentPool -= winAmount; // Pool ထဲမှ နှုတ်ယူမည်
    }

    return {
        isCaught: isCaught,
        winAmount: winAmount,
        remainingPool: fishData.currentPool
    };
}

/**
 * Admin Dashboard သို့ အမြတ်ငွေ ပို့ရန် (နောက်ပိုင်းတွင် ချိတ်ဆက်ရန်)
 */
function reportAdminProfit(profit) {
    console.log("Reporting to Admin.html: " + profit);
    // ဤနေရာတွင် Admin.html သို့ ဒေတာလှမ်းပို့မည့် ကုဒ်ရေးရမည်
}
