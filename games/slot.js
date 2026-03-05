let slotProfit = 0

function loadSlot(){

document.getElementById("gameArea").innerHTML=`
<h2 id="gameTitle">SLOT GAME</h2>
<div id="gameScreen"></div>
<br>
<input id="betAmount" placeholder="Bet units">
<button onclick="spinSlot()">SPIN</button>
<div id="resultText"></div>
`

}

function spinSlot(){

let bet = parseInt(document.getElementById("betAmount").value)

if(isNaN(bet)||bet<=0){alert("Enter valid bet"); return}
if(bet>balance){alert("Not enough units"); return}

balance -= bet

// AI decide result
let result = aiResult() // "player" or "house"

let reward = 0

if(result=="player"){
reward = bet*2
balance += reward
slotProfit -= reward
document.getElementById("resultText").innerText=" WIN "+reward
}else{
slotProfit += bet
document.getElementById("resultText").innerText=" LOSE "+bet
}

updateBalance()

}