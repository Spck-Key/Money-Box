let bullProfit = 0

function loadBull(){

document.getElementById("gameArea").innerHTML=`
<h2 id="gameTitle">BULL GAME</h2>
<div id="gameScreen"></div>
<br>
<input id="betAmount" placeholder="Bet units">
<button onclick="playBull()">ROLL</button>
<div id="resultText"></div>
`

}

function playBull(){

let bet = parseInt(document.getElementById("betAmount").value)

if(isNaN(bet)||bet<=0){alert("Enter valid bet"); return}
if(bet>balance){alert("Not enough units"); return}

balance -= bet

let result = aiRoundPlay(bet)

if(result>0){
balance += result
bullProfit -= result
document.getElementById("resultText").innerText=" BIG WIN "+result
}else{
bullProfit += bet
document.getElementById("resultText").innerText=" LOSE "+Math.abs(result)
}

updateBalance()

}