const db = require('../database/connection');

class BuGyee {
    constructor() {
        this.taxRate = 0.01; // အနိုင်ရသူဆီမှ ၁% အခွင့်ဖြတ်ရန်
    }

    // ၁။ ဖဲ ၅၂ ချပ် ထုတ်ခြင်း
    createDeck() {
        let suits = ['spade', 'heart', 'diamond', 'club'];
        let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        let deck = [];
        for (let s of suits) {
            for (let v of values) {
                deck.push({ suit: s, value: v });
            }
        }
        return deck;
    }

    // ၂။ ဘူကြီး အမှတ်တွက်ခြင်း (၁၀ အပြတ်စားလျှင် "ဘူ" ဟုခေါ်သည်)
    calculateBuPoints(cards) {
        let total = 0;
        cards.forEach(card => {
            let val = card.value;
            if (['10', 'J', 'Q', 'K'].includes(val)) total += 10;
            else if (val === 'A') total += 1;
            else total += parseInt(val);
        });
        
        let point = total % 10;
        return point === 0 ? 10 : point; // ၁၀ မှတ်ရလျှင် အကြီးဆုံး "ဘူ"
    }

    // ၃။ အစပ် (Multiplier) စစ်ဆေးခြင်း (၂ ပွင့်ဆိုင်မှ ၅ ပွင့်ဆိုင်အထိ)
    getMultiplier(cards) {
        let suits = cards.map(c => c.suit);
        let counts = {};
        suits.forEach(s => counts[s] = (counts[s] || 0) + 1);
        
        let maxSuit = Math.max(...Object.values(counts));
        
        if (maxSuit === 5) return 5; // ငါးစပ် (5x)
        if (maxSuit === 4) return 4; // လေးစပ် (4x)
        if (maxSuit === 3) return 3; // သုံးစပ် (3x)
        if (maxSuit === 2) return 2; // စုံ/နှစ်စပ် (2x)
        return 1; // သာမန် (1x)
    }

    // ၄။ ဖဲဝေခြင်း နှင့် AI ဖြင့် ပိုင်ရှင်အသာစီးပေးခြင်း
    dealBuCards(players, dealerId, isOwnerDealer) {
        let deck = this.createDeck();
        deck.sort(() => Math.random() - 0.5);

        let deals = {};
        // တစ်ဦးချင်းစီကို ဖဲ ၅ ချပ်စီ ဝေမည်
        players.forEach(p => {
            deals[p.id] = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
        });
        deals[dealerId] = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];

        // ပိုင်ရှင်က ဒိုင်ဖြစ်လျှင် Player ဆီ ဖဲကောင်းမရောက်အောင် AI က ညှိမည်
        if (isOwnerDealer) {
            let dealerScore = this.calculateBuPoints(deals[dealerId]);
            players.forEach(p => {
                let playerScore = this.calculateBuPoints(deals[p.id]);
                // Player က ၈ မှတ်အထက်ရပြီး ဒိုင်ထက်သာနေပါက ဖဲချင်းလဲလှယ်မည်
                if (playerScore > dealerScore && playerScore >= 8) {
                    let temp = deals[dealerId];
                    deals[dealerId] = deals[p.id];
                    deals[p.id] = temp;
                }
            });
        }
        return deals;
    }

    // ၅။ အနိုင်အရှုံး ဆုံးဖြတ်ခြင်းနှင့် ၁% အခွင့်ဖြတ်ခြင်း
    async processAndTax(winnerId, winAmount) {
        try {
            let tax = winAmount * this.taxRate;
            let netWin = winAmount - tax;

            // Database တွင် ယူနစ်များ အပ်ဒိတ်လုပ်ခြင်း
            await db.promise().query("UPDATE users SET balance = balance + ? WHERE user_id = ?", [netWin, winnerId]);
            await db.promise().query("UPDATE users SET balance = balance + ? WHERE role = 'owner'", [tax]);
            
            // မှတ်တမ်းသွင်းခြင်း
            await db.promise().query(
                "INSERT INTO game_history (player_id, amount, tax, game_type) VALUES (?, ?, ?, 'bugyee')",
                [winnerId, netWin, tax]
            );

            return { success: true, netWin, tax };
        } catch (err) {
            console.error("Bu Gyee Taxation Error:", err);
            return { success: false };
        }
    }
}

module.exports = new BuGyee();
