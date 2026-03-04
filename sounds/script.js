// အသံခေါ်ယူသည့်စနစ်
function playSfx(fileName) {
    let audio = new Audio(`../sounds/${fileName}.mp3`);
    audio.play();
}

// ဥပမာ - ဖဲဝေသည့်အခါ ခေါ်သုံးပုံ
function dealCards() {
    playSfx('deal'); 
    // ကျန်သည့် Logic များ...
}

// ဥပမာ - နိုင်/ရှုံး အဆုံးအဖြတ်ပေးပုံ
if (playerWin) {
    playSfx('win');
} else {
    playSfx('lose');
}
