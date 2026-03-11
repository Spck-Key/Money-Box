const db = require('../database/connection');

class ShanKoneMee {
    constructor() {
        this.taxRate = 0.01; // ၁% အခွင့်
        this.minProfitRate = 0.30; // ၃၀% အမြတ်ထိန်းရန်
    }

    // ဖဲ ၅၂ ချပ် ထုတ်ခြင်း
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

    // အမှတ်တွက်ခြင်း
    calculatePoints(cards) {
        let total = 0;
        cards.forEach(card => {
            let val = card.value;
            if (val === 'A') total += 1;
            else if (['10', 'J', 'Q', 'K'].includes(val)) total += 0;
            else total += parseInt(val);
        });
        return total % 10;
    }

    // ဖဲဝေခြင်း နှင့် AI အသာစီးပေးခြင်း
    dealCards(players, dealerId, isOwnerDealer) {
        let deck = this.createDeck();
        deck.sort(() => Math.random() - 0.5);

        let deals = {};
        players.forEach(p => {
            deals[p.id] = [deck.pop(), deck.pop()];
        });
        deals[dealerId] = [deck.pop(), deck.pop()];

        // ပိုင်ရှင်က ဒိုင်ဖြစ်လျှင် AI က ဒိုင်ကို ဖဲကောင်းပေးမည်
        if (isOwnerDealer) {
            let dealerPoints = this.calculatePoints(deals[dealerId]);
            players.forEach(p => {
                let playerPoints = this.calculatePoints(deals[p.id]);
                if (playerPoints > dealerPoints && playerPoints >= 8) {
                    // ဖဲချင်းလဲလှယ်၍ ဒိုင်ကို နိုင်စေခြင်း
                    let temp = deals[dealerId];
                    deals[dealerId] = deals[p.id];
                    deals[p.id] = temp;
                }
            });
        }
        return deals;
    }

    // အနိုင်ရသူဆီမှ ၁% ဖြတ်ပြီး ပိုင်ရှင်ဆီပို့ခြင်း
    async collectTax(winnerId, amount) {
        let tax = amount * this.taxRate;
        let netWin = amount - tax;

        await db.promise().query("UPDATE users SET balance = balance + ? WHERE user_id = ?", [netWin, winnerId]);
        await db.promise().query("UPDATE users SET balance = balance + ? WHERE role = 'owner'", [tax]);
        await db.promise().query("INSERT INTO game_history (player_id, tax, amount) VALUES (?, ?, ?)", [winnerId, tax, netWin]);
        
        return { netWin, tax };
    }
}

module.exports = new ShanKoneMee();
