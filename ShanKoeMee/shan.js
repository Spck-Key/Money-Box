/**
 * Shan Koe Mee - AI Logic (70/30 RTP System)
 */

// ၁။ ဖဲချပ်များ သတ်မှတ်ချက်
const SHAN_CARDS = {
    suits: ['♠', '♥', '♦', '♣'],
    values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
};

// ၂။ AI Settings (30% ဒိုင်မြတ်၊ 70% ကစားသူနိုင်ခြေ)
let shanData = {
    houseEdge: 0.30, 
    playerRTP: 0.70, 
    currentPool: 800000 // လျော်ကြေးပေးရန် အိတ်ကပ်
};

/**
 * အမှတ်နှင့် အဆ (Multiplier) တွက်ချက်ခြင်း
 */
function getHandDetails(cards) {
    let points = 0;
    let suitsCount = {};
    
    cards.forEach(c => {
        // အမှတ်တွက်ခြင်း
        let v = c.value;
        if (v === 'A') points += 1;
        else if (['10', 'J', 'Q', 'K'].includes(v)) points += 0;
        else points += parseInt(v);

        // အပွင့်တူ (Suits) စစ်ဆေးခြင်း
        suitsCount[c.suit] = (suitsCount[c.suit] || 0) + 1;
    });

    let finalPoints = points % 10;
    let multiplier = 1;

    // ၂ ချပ် အပွင့်တူလျှင် ၂ ဆ၊ ၃ ချပ် အပွင့်တူလျှင် ၃ ဆ
    let maxSuits = Math.max(...Object.values(suitsCount));
    if (cards.length === 2 && maxSuits === 2) multiplier = 2;
    if (cards.length === 3 && maxSuits === 3) multiplier = 3;

    // အထူးအဆများ (ဥပမာ- ၃ ချပ်တူ ဒေါင်းလျှင် ၅ ဆ)
    if (cards.length === 3 && cards[0].value === cards[1].value && cards[1].value === cards[2].value) {
        multiplier = 5;
    }

    return { points: finalPoints, mult: multiplier };
}

/**
 * AI ဖဲဝေခြင်း (Stealth Mode ပါဝင်သည်)
 */
function playShan(betAmount) {
    // ဒိုင်အမြတ် 30% ကို ဖြတ်မည်
    let adminCut = betAmount * shanData.houseEdge;
    shanData.currentPool += (betAmount * shanData.playerRTP);

    let playerHand = [drawCard(), drawCard()];
    let dealerHand = [drawCard(), drawCard()];

    // --- AI Stealth Mode ---
    // Pool ထဲမှာ ပိုက်ဆံနည်းနေရင် ဒိုင်ကို ရှမ်း (၉) အတင်းပေးမည်
    if (shanData.currentPool < 300000) {
        dealerHand = [
            { suit: '♠', value: '9' },
            { suit: '♠', value: 'K' }
        ];
    }

    let pResult = getHandDetails(playerHand);
    let dResult = getHandDetails(dealerHand);

    let status = "";
    let winAmt = 0;

    // အနိုင်အရှုံး ဆုံးဖြတ်ခြင်း
    if (pResult.points > dResult.points) {
        status = "Player Wins";
        winAmt = betAmount * pResult.mult;
        shanData.currentPool -= winAmt; // Pool ထဲမှ နှုတ်မည်
    } else if (pResult.points < dResult.points) {
        status = "Dealer Wins";
        winAmt = -(betAmount * dResult.mult);
    } else {
        status = "Draw";
    }

    return {
        player: playerHand,
        dealer: dealerHand,
        playerPoints: pResult.points,
        dealerPoints: dResult.points,
        pMult: pResult.mult,
        dMult: dResult.mult,
        status: status,
        amount: winAmt,
        adminProfit: adminCut
    };
}

function drawCard() {
    return {
        suit: SHAN_CARDS.suits[Math.floor(Math.random() * 4)],
        value: SHAN_CARDS.values[Math.floor(Math.random() * 13)]
    };
}
