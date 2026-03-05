// ===============================
// MONEYBED 3D AI SYSTEM
// ===============================

// AI CONFIG
let AI_CONFIG = {
    minPlayers:1,
    maxPlayers:4,
    houseWinRate:0.4, // Owner % win
    autoBalance:true
};

// ===============================
// GENERATE AI PLAYERS
// ===============================
function generateAIPlayers(maxSeats){

    let count = Math.floor(Math.random()*(AI_CONFIG.maxPlayers-AI_CONFIG.minPlayers+1))+AI_CONFIG.minPlayers

    return Math.min(count,maxSeats-1) // leave seat for real player
}

// ===============================
// AI DECIDE WIN/LOSE
// ===============================
function aiResult(){

    let rand = Math.random()

    if(rand < AI_CONFIG.houseWinRate){
        return "house"
    }else{
        return "player"
    }

}

// ===============================
// AI BALANCE BETS (Dragon/Tiger / Bull)
// ===============================
function aiBalanceBet(playerBet, sideA, sideB){

    if(sideA == 0){
        return {side:"A", amount:playerBet}
    }

    if(sideB == 0){
        return {side:"B", amount:playerBet}
    }

    return null
}

// ===============================
// AI DEALER PICK CARD
// ===============================
function aiPickCard(deck){

    // simple random pick
    let idx = Math.floor(Math.random()*deck.length)
    let card = deck.splice(idx,1)[0]
    return card

}

// ===============================
// SET HOUSE WIN %
function setHouseWinRate(percent){

    AI_CONFIG.houseWinRate = percent
    alert("House Win rate set: "+percent)

}

// ===============================
// AI ROUND PLAY
function aiRoundPlay(playerBet){

    let result = aiResult()
    let winAmount = 0

    if(result == "player"){
        winAmount = playerBet*2
    }else{
        winAmount = -playerBet
    }

    return winAmount

}

// ===============================
// AI AUTO SEATS
function aiFillSeats(maxSeats, realPlayers){

    let aiCount = generateAIPlayers(maxSeats)
    let seats = []

    for(let i=0;i<realPlayers.length;i++){
        seats.push(realPlayers[i])
    }

    for(let j=0;j<aiCount;j++){
        seats.push("AI_"+Math.floor(Math.random()*10000))
    }

    return seats

}

// ===============================
// AI PROFIT CONTROL
// ===============================
function aiProfitControl(playerBet, housePercent){

    let houseWin = playerBet * housePercent
    let playerWin = playerBet - houseWin

    return {house:houseWin, player:playerWin}

}