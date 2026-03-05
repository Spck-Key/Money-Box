let cardsProfit = 0
let table = {players:[], aiPlayers:[]}

function loadCards(){

document.getElementById("gameArea").innerHTML=`
<h2 id="gameTitle">CARD GAME</h2>
<div id="gameScreen"></div>
<br>
<input id="betAmount" placeholder="Bet units">
<button onclick="playCards()">PLAY ROUND</button>
<div id="resultText"></div>
`

}

function playCards(){

let bet = parseInt(document.getElementById("betAmount").value)

if(isNaN(bet)||bet<=0){alert("Enter valid bet"); return}
if(bet>balance){alert("Not enough units"); return}

balance -= bet

// AI fill seats
table.players = [currentUser]
table.aiPlayers = aiFillSeats(4, table.players)

// AI decide
let result = aiRoundPlay(bet)

if(result>0){
balance += result
cardsProfit -= result
document.getElementById("resultText").innerText=" WIN "+result
}else{
cardsProfit += bet
document.getElementById("resultText").innerText=" LOSE "+Math.abs(result)
}

updateBalance()

}