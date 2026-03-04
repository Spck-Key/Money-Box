/**
 * Buffalo King Slot - AI Logic
 * 70/30 RTP System (70% Player / 30% House)
 */

// ၁။ Symbols များနှင့် အဆများ သတ်မှတ်ချက် (Paytable)
const BUFFALO_SYMBOLS = [
    { name: "Buffalo", mult: 250, weight: 2 }, // အပွင့်အကြီးဆုံး (ထွက်ခဲသည်)
    { name: "Lion", mult: 150, weight: 5 },
    { name: "Elephant", mult: 150, weight: 5 },
    { name: "Zebra", mult: 120, weight: 8 },
    { name: "Deer", mult: 120, weight: 8 },
    { name: "A", mult: 80, weight: 15 },
    { name: "K", mult: 80, weight: 15 },
    { name: "Q", mult: 60, weight: 20 },
    { name: "J", mult: 60, weight: 20 },
    { name: "10", mult: 60, weight: 25 },
    { name: "9", mult: 60, weight: 25 },
    { name: "Scatter", mult: 0, weight: 3 } // Free Spins အတွက်
];

// ၂။ ဂိမ်း၏ လက်ရှိအခြေအနေ (AI Control Settings)
let gameData = {
    houseEdge: 0.30,  // ဒိုင်အမြတ် 30%
    playerRTP: 0.70,  // ကစားသူနိုင်ခြေ 70%
    currentPool: 500000 // ဒိုင်လက်ထဲရှိ လျော်ကြေးပေးရန် အိတ်ကပ် (RTP Pool)
};

/**
 * Spin တစ်ချက်ချင်းစီအတွက် AI တွက်ချက်ပေးသည့် Function
 */
function processSpin(betAmount) {
    // ကစားသမားလောင်းကြေးထဲမှ ဒိုင်အမြတ် 30% ကို အရင်ဖြတ်မည်
    let adminCut = betAmount * gameData.houseEdge;
    
    // ကျန်တဲ့ 70% ကို လျော်ကြေးပေးရန် Pool ထဲသို့ ထည့်မည်
    gameData.currentPool += (betAmount * gameData.playerRTP);

    // AI မှ Pool အခြေအနေကိုကြည့်ပြီး Symbols များ ရွေးချယ်ပေးခြင်း
    let spinResult = [];
    for (let i = 0; i < 15; i++) { // 5x3 Grid အတွက်
        let symbol = pickSmartSymbol(gameData.currentPool);
        spinResult.push(symbol);
    }

    // အနိုင်ပမာဏ တွက်ချက်ခြင်း (1024 Ways Logic အခြေခံ)
    let winTotal = calculateWin(spinResult, betAmount);

    // အကယ်၍ နိုင်လျှင် Pool ထဲမှ ပိုက်ဆံနှုတ်မည်
    gameData.currentPool -= winTotal;

    return {
        grid: spinResult,
        payout: winTotal,
        adminProfit: adminCut,
        remainingPool: gameData.currentPool
    };
}

/**
 * Pool ထဲရှိ ပိုက်ဆံအပေါ်မူတည်ပြီး Symbol ထုတ်ပေးသည့် AI Logic
 */
function pickSmartSymbol(pool) {
    // --- Stealth Mode ---
    // Pool ထဲမှာ ပိုက်ဆံနည်းနေရင် (ဥပမာ ၅ သောင်းအောက်) အမှတ်နည်းတဲ့ Symbol တွေပဲ ပေးမည်
    if (pool < 50000) {
        let lowTierSymbols = BUFFALO_SYMBOLS.filter(s => s.mult <= 80);
        return lowTierSymbols[Math.floor(Math.random() * lowTierSymbols.length)];
    }
    
    // Pool ထဲမှာ ပိုက်ဆံများနေမှသာ အမှတ်ကြီးတဲ့ Symbol (ဥပမာ-ကျွဲရုပ်) တွေ ပွင့်လာနိုင်မည်
    let randomValue = Math.random() * 100;
    let cumulativeWeight = 0;

    for (let symbol of BUFFALO_SYMBOLS) {
        cumulativeWeight += symbol.weight;
        if (randomValue < cumulativeWeight) {
            return symbol;
        }
    }
    return BUFFALO_SYMBOLS[BUFFALO_SYMBOLS.length - 1];
}

/**
 * အနိုင်အရှုံး တွက်ချက်သည့် အပိုင်း
 */
function calculateWin(grid, bet) {
    // ဤနေရာတွင် 1024 Ways စနစ်အရ အမှတ်တွက်သည့် Algorithm ပါဝင်မည်
    // လက်ရှိတွင် Random အနိုင်ပေးသည့်ပုံစံဖြင့် စမ်းသပ်ရန် ရေးထားပါသည်
    let chance = Math.random();
    if (chance > 0.8) { // ၂၀ ရာခိုင်နှုန်းသာ နိုင်ခြေပေးထားသည်
        return bet * 2; // လောင်းကြေး၏ ၂ ဆ လျော်ပေးခြင်း
    }
    return 0;
}
