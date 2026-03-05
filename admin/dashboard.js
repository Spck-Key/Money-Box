// ===============================
// MONEYBED3D ADMIN DASHBOARD
// ===============================

// SEARCH USER
function searchUser(){

    let searchId = document.getElementById("searchId").value

    if(searchId == ""){
        alert("Enter ID")
        return
    }

    let data = localStorage.getItem("user_"+searchId)

    if(!data){
        alert("User not found")
        document.getElementById("userInfo").innerHTML=""
        return
    }

    let userData = JSON.parse(data)

    let html = `
    <p>ID: ${searchId}</p>
    <p>Units: ${userData.balance}</p>
    `

    document.getElementById("userInfo").innerHTML = html

}

// ===============================
// ADD UNITS
function addUnits(){

    let searchId = document.getElementById("searchId").value
    let addAmt = parseInt(document.getElementById("addUnit").value)

    if(!searchId || isNaN(addAmt)){
        alert("Enter valid data")
        return
    }

    let data = JSON.parse(localStorage.getItem("user_"+searchId))
    data.balance += addAmt

    localStorage.setItem("user_"+searchId, JSON.stringify(data))

    alert(addAmt + " units added")
    searchUser()
}

// ===============================
// REMOVE UNITS
function removeUnits(){

    let searchId = document.getElementById("searchId").value
    let remAmt = parseInt(document.getElementById("addUnit").value)

    if(!searchId || isNaN(remAmt)){
        alert("Enter valid data")
        return
    }

    let data = JSON.parse(localStorage.getItem("user_"+searchId))
    data.balance -= remAmt

    if(data.balance <0) data.balance=0

    localStorage.setItem("user_"+searchId, JSON.stringify(data))

    alert(remAmt + " units removed")
    searchUser()
}

// ===============================
// CREATE USER ACCOUNT
function createUser(){

    let phone = document.getElementById("newPhone").value
    let name = document.getElementById("newName").value
    let id = "USER_"+Math.floor(Math.random()*10000)

    if(!phone || !name){
        alert("Enter phone & name")
        return
    }

    let newUser = {
        phone:phone,
        name:name,
        balance:1000
    }

    localStorage.setItem("user_"+id, JSON.stringify(newUser))

    alert("New user created with ID: "+id)

}

// ===============================
// VIEW PROFIT
let slotProfit = 0
let bullProfit = 0
let cardsProfit = 0

function showProfit(){

    let total = slotProfit + bullProfit + cardsProfit

    alert("Slot Profit: "+slotProfit+
          "\nBull Profit: "+bullProfit+
          "\nCards Profit: "+cardsProfit+
          "\nTotal Profit: "+total)
}