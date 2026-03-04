/** * Big/Small Logic: 3 Dice. Small (4-10), Big (11-17).
 * House Edge: 30% control for "Triple" (Dealer eats all) or "Opposite result".
 *
 */

function playBigSmall(choice) {
    let d1, d2, d3, total;
    let shouldDealerWin = Math.random() < 0.30; // ၃၀% ဒိုင်အနိုင်ရယူခြင်း

    function roll() {
        d1 = Math.floor(Math.random() * 6) + 1;
        d2 = Math.floor(Math.random() * 6) + 1;
        d3 = Math.floor(Math.random() * 6) + 1;
        total = d1 + d2 + d3;
    }

    roll();

    if (shouldDealerWin) {
        // Player ရှုံးမည့်ရလဒ် ထွက်အောင် ပြန်လှည့်ခြင်း (သို့မဟုတ်) Triple ပေးခြင်း
        while (true) {
            let res = (total >= 4 && total <= 10) ? 'small' : 'big';
            // အကယ်၍ အံစာတုံး ၃ လုံးတူလျှင် (Triple) ဒိုင်အမြဲနိုင်သည်
            if (d1 === d2 && d2 === d3) break; 
            if (res !== choice) break;
            roll();
        }
    }

    document.getElementById('d1').innerText = d1;
    document.getElementById('d2').innerText = d2;
    document.getElementById('d3').innerText = d3;
    document.getElementById('total-score').innerText = "စုစုပေါင်း: " + total;

    const status = document.getElementById('status');
    let finalRes = (total >= 4 && total <= 10) ? 'small' : 'big';

    // Triple ဖြစ်ပါက ဒိုင်စားသည်
    if (d1 === d2 && d2 === d3) {
        status.innerText = "တူ (Triple)! ဒိုင်စားသွားပါပြီ! ";
        status.style.color = "#e74c3c";
    } else if (choice === finalRes) {
        status.innerText = "လူကြီးမင်း နိုင်ပါသည်! ";
        status.style.color = "#2ecc71";
    } else {
        status.innerText = "ဒိုင်စားသွားပါပြီ! ";
        status.style.color = "#e74c3c";
    }
}
