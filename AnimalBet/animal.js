/**
 * Animal Betting Game - AI Logic (70/30 Rule)
 */

const ANIMALS = ["ရွှေငါး", "ပုဇွန်", "ကြက်", "ကျား", "ကဏန်း", "ဖား"];

let animalSettings = {
    houseEdge: 0.30,
    playerRTP: 0.70,
    pool: 1500000 // လျော်ကြေးပေးရန် ရန်ပုံငွေ
};

function playAnimalGame(userBets) {
    // userBets = { "ရွှေငါး": 5000, "ကျား": 2000, ... }
    
    let totalBetAmt = Object.values(userBets).reduce((a, b) => a + b, 0);
    let adminProfit = totalBetAmt * animalSettings.houseEdge;
    animalSettings.pool += (totalBetAmt * animalSettings.playerRTP);

    let finalResult = "";

    // --- AI Stealth Mode ---
    // လောင်းကြေးအများဆုံး ကောင်ကို ရှောင်ထွက်မည်
    let sortedEntries = Object.entries(userBets).sort((a, b) => b[1] - a[1]);
    
    // Pool နည်းနေလျှင် သို့မဟုတ် လောင်းကြေးအရမ်းများနေလျှင် လောင်းကြေးအနည်းဆုံးကောင်ကို ရွေးမည်
    if (animalSettings.pool < (totalBetAmt * 5)) {
        finalResult = sortedEntries[sortedEntries.length - 1][0]; 
    } else {
        finalResult = ANIMALS[Math.floor(Math.random() * 6)];
    }

    let winAmount = (userBets[finalResult] || 0) * 5; // ၅ ဆ လျော်ကြေး
    animalSettings.pool -= winAmount;

    return {
        winningAnimal: finalResult,
        payout: winAmount,
        commission: adminProfit
    };
}
