const shanKoneMee = require('../engines/shan_kone_mee');
const buGyee = require('../engines/bu_gyee');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Player Connected:', socket.id);

        // ၁။ ဂိမ်းခန်းထဲဝင်ခြင်း
        socket.on('join_room', (data) => {
            socket.join(data.roomId);
            console.log(`User ${data.userId} joined Room ${data.roomId}`);
        });

        // ၂။ ရှမ်းကိုးမီး စတင်ခြင်း (ဒိုင်/ပိုင်ရှင် မှ ခေါ်ယူခြင်း)
        socket.on('start_shan_kone_mee', async (data) => {
            const { roomId, players, dealerId, isOwnerDealer, betAmount } = data;

            // Engine မှ ဖဲဝေခြင်း (AI ညှိချက်ပါဝင်သည်)
            const deals = shanKoneMee.dealCards(players, dealerId, isOwnerDealer);

            // ကစားသမားအားလုံးဆီ ဖဲများပို့ပေးခြင်း
            io.to(roomId).emit('deal_cards', { deals });

            // ၅ စက္ကန့်အကြာတွင် အမှတ်စစ်ပြီး ၁% ဖြတ်မည်
            setTimeout(async () => {
                let results = [];
                let dealerCards = deals[dealerId];
                let dealerPoints = shanKoneMee.calculatePoints(dealerCards);

                for (let p of players) {
                    let playerCards = deals[p.id];
                    let playerPoints = shanKoneMee.calculatePoints(playerCards);
                    let mult = shanKoneMee.getMultiplier(playerCards);

                    // အနိုင်အရှုံးစစ်ခြင်း
                    if (playerPoints > dealerPoints) {
                        let winAmount = betAmount * mult;
                        // ၁% အခွင့်ဖြတ်ခြင်း
                        let taxData = await shanKoneMee.collectTax(p.id, winAmount);
                        results.push({ id: p.id, status: 'Win', amount: taxData.netWin, tax: taxData.tax });
                    } else {
                        results.push({ id: p.id, status: 'Loss', amount: -betAmount });
                    }
                }
                io.to(roomId).emit('game_result', { results });
            }, 5000);
        });

        // ၃။ ဘူကြီး စတင်ခြင်း
        socket.on('start_bu_gyee', async (data) => {
            const { roomId, players, dealerId, isOwnerDealer, betAmount } = data;

            const deals = buGyee.dealBuCards(players, dealerId, isOwnerDealer);

            io.to(roomId).emit('deal_bugyee_cards', { deals });

            // ဘူကြီးသည် ဖဲစီချိန် ၁၀ စက္ကန့်ပေးမည်
            setTimeout(async () => {
                let results = [];
                let dealerScore = buGyee.calculateBuPoints(deals[dealerId]);

                for (let p of players) {
                    let playerScore = buGyee.calculateBuPoints(deals[p.id]);
                    let mult = buGyee.getMultiplier(deals[p.id]);

                    if (playerScore > dealerScore) {
                        let winAmount = betAmount * mult;
                        let taxData = await buGyee.processAndTax(p.id, winAmount);
                        results.push({ id: p.id, status: 'Win', amount: taxData.netWin, tax: taxData.tax });
                    } else {
                        results.push({ id: p.id, status: 'Loss', amount: -betAmount });
                    }
                }
                io.to(roomId).emit('game_result', { results });
            }, 10000);
        });

        // ၄။ ကြော်ငြာစာတန်းပို့ခြင်း
        socket.on('broadcast_ad', (data) => {
            io.emit('new_announcement', { message: data.message });
        });

        socket.on('disconnect', () => {
            console.log('Player Disconnected');
        });
    });
};
