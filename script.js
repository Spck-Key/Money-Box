// ပိုင်ရှင် အချက်အလက်
const MASTER = { phone: "09950823193", name: "ThuraKyaw", id: "THURAKYAW16.10.2000" };

// Login Logic
function checkLogin() {
    const p = document.getElementById('phone').value, n = document.getElementById('name').value, i = document.getElementById('admin_id').value;
    if (p === MASTER.phone && n === MASTER.name && i === MASTER.id) {
        alert("ပိုင်ရှင်နေရာသို့ ကြိုဆိုပါသည်!");
        window.location.href = "admin.html";
    } else {
        alert("အချက်အလက် မှားယွင်းနေပါသည်");
    }
}

// AI ID ထုတ်ပေးခြင်း
function createNewAcc() {
    const phone = document.getElementById('newPhone').value, name = document.getElementById('newName').value;
    if (!phone || !name) return alert("ဖုန်းနှင့် အမည် အရင်ဖြည့်ပါ");
    const newID = "MB-" + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('generatedID').value = newID;
    addLog(newID, "Account Created", 0);
    alert("အကောင့်ဖွင့်ပြီးပါပြီ။ ID: " + newID);
}

// ယူနစ် ဖြည့်/နှုတ် (ID ကို အခြေခံသည်)
function updateUnit(type) {
    const id = document.getElementById('targetID').value;
    const amount = document.getElementById('unitAmount').value;
    if (!id || !amount) return alert("ID နှင့် ပမာဏ ထည့်ပါ");
    
    const msg = type === 'plus' ? "ပေါင်းထည့်မှု" : "နှုတ်ယူမှု";
    alert(`${id} သို့ ${amount} Ks ${msg} အောင်မြင်ပါသည်`);
    addLog(id, type === 'plus' ? "Deposit" : "Withdraw", amount);
}

// မှတ်တမ်းတင်ခြင်း
function addLog(id, action, amount) {
    const logArea = document.getElementById('logArea');
    if (!logArea) return;
    const entry = document.createElement('div');
    entry.style = "border-bottom: 1px solid #333; padding: 5px 0;";
    entry.innerHTML = `[${new Date().toLocaleTimeString()}] <b>${id}</b>: ${action} - ${amount} Ks`;
    logArea.prepend(entry);
}

// ဖဲချပ်များ ထည့်သွင်းခြင်း
function initDeck() {
    const suits = ['', '', '', ''], values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'], grid = document.getElementById('deck-grid');
    if (!grid) return;
    suits.forEach(s => {
        values.forEach(v => {
            const c = document.createElement('div');
            c.className = 'card'; c.innerText = v+s;
            c.onclick = () => { alert("ရွေးချယ်ပြီး: " + v+s); document.getElementById('deck-grid').style.display = 'none'; };
            grid.appendChild(c);
        });
    });
}

window.onload = initDeck;
