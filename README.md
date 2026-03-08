/////////////////////////////
// ID Toggle for Login
/////////////////////////////
function showID(){
    const x = document.getElementById("id");
    x.type = (x.type === "password") ? "text" : "password";
}

/////////////////////////////
// Login  Lobby
/////////////////////////////
function login(){
    window.location.href = "lobby.html";
}

/////////////////////////////
// Lobby  Table
/////////////////////////////
function goTable(gameName){
    localStorage.setItem("currentGame", gameName);
    window.location.href = "table.html";
}

/////////////////////////////
// Animate Unit Change
/////////////////////////////
function animateUnit(playerElem, start, end, duration = 800){
    let startTime = null;

    function animation(currentTime){
        if(!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentUnit = Math.floor(start + (end - start) * progress);
        playerElem.querySelector(".unit").innerText = currentUnit;
        if(progress < 1){
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

/////////////////////////////
// Play Round
/////////////////////////////
function playRound(){
    const players = document.querySelectorAll(".player");
    const unitsBefore = Array.from(players).map(p => parseInt(p.querySelector(".unit").innerText));

    // AI random gain (optional)
    const ai = document.querySelector(".player.ai");
    if(Math.random() < 0.5){
        const add = Math.floor(Math.random() * 20) + 5;
        animateUnit(ai, parseInt(ai.querySelector(".unit").innerText), parseInt(ai.querySelector(".unit").innerText) + add);
    }

    // Random winner (Player or AI, NOT Owner)
    const winnerCandidates = Array.from(players).filter(p => !p.classList.contains("owner"));
    const winnerIndex = Math.floor(Math.random() * winnerCandidates.length);
    const winner = winnerCandidates[winnerIndex];

    // Unit allocation
    const totalUnits = unitsBefore.reduce((a,b)=>a+b,0);
    const gain = Math.floor(totalUnits * 0.3);

    const winnerUnitBefore = parseInt(winner.querySelector(".unit").innerText);
    const owner = document.querySelector(".player.owner");
    const ownerUnitBefore = parseInt(owner.querySelector(".unit").innerText);

    // Animate Winner and Owner
    animateUnit(winner, winnerUnitBefore, winnerUnitBefore + gain);
    animateUnit(owner, ownerUnitBefore, ownerUnitBefore + Math.floor(gain * 0.1));

    // Optional win sound
    // const winSound = new Audio('assets/sounds/win.mp3');
    // winSound.play();

    setTimeout(() => {
        alert(`Winner is ${winner.textContent.split("\n")[0]}! Gain: ${gain}`);
    }, 900);
}

/////////////////////////////
// Auto-Play Multiple Rounds
/////////////////////////////
function autoPlay(rounds = 5, delay = 1000){
    let count = 0;

    function nextRound(){
        if(count >= rounds) return;
        playRound();
        count++;
        setTimeout(nextRound, delay);
    }

    nextRound();
}

/////////////////////////////
// Dynamic Game Name on Table.html
/////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const gameName = localStorage.getItem("currentGame");
    if(gameName){
        const gameTitle = document.getElementById("gameName");
        if(gameTitle) gameTitle.innerText = gameName;
    }
});