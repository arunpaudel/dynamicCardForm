// Getting necessary elements
const contBtn = document.querySelector(".continue");
const intro = document.querySelector(".intro");
const form = document.querySelector(".form");
const formE = document.querySelector("form");
const addBtn = document.querySelector(".add");
const delBtn = document.querySelector(".delete");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const finishBtn = document.querySelector(".finish");
var currentCardNo = 1;

// Buttons function
function buttons() {
    let totalCards = formE.childElementCount;
    prevBtn.disabled = (currentCardNo === 1);
    nextBtn.disabled = (currentCardNo === totalCards);
    finishBtn.disabled = (totalCards < 5 || totalCards > 50);
    delBtn.disabled = (totalCards === 1);
    addBtn.disabled = (totalCards > 50);
}

// Display form and hide intro upon clicking continue
contBtn.addEventListener("click", function() {
    intro.classList.add("hidden");
    form.classList.remove("hidden");
    // Show first form card
    showCard(currentCardNo);
    // Calling button function
    buttons();
});

// Show card
function showCard(cardNo) {
    var card = document.querySelector("#card" + cardNo);
    card.classList.remove("hidden");
}

// Hide card
function hideCard(cardNo) {
    var card = document.querySelector("#card" + cardNo);
    card.classList.add("hidden");
}

// Add card
function addCard() {
    // Get total number of form cards
    let totalCards = formE.childElementCount;
    // Run a loop to change ID's of the cards after the current card
    for (let j = currentCardNo + 1; j <= totalCards; j++) {
        let card = document.getElementById("card" + j);
        card.id = "card" + (j + 1);
        card.querySelector(".pNo").innerText = j + 1;
    }
    var newCard = document.createElement("div");
    newCard.id = "card" + (currentCardNo + 1);
    newCard.classList.add("formCard", "hidden");
    newCard.innerHTML = '<h3 class="header center">Person <span class="pNo">' + (currentCardNo + 1) + '</span></h3><label>First Name</label><input type="text"/><label>Middle Name</label><input type="text"/><label>Last Name</label><input type="text"/><label>Address</label><input type="text"/><label>Some Input</label><input type="text"/>';

    // Get Current card
    let currentCard = document.querySelector("#card" + currentCardNo);
    // Insert
    formE.insertBefore(newCard, currentCard.nextSibling);
    // Hide existing card and then show new
    hideCard(currentCardNo);
    currentCardNo++;
    showCard(currentCardNo);
    buttons();
}

// Delete Card
function deleteCard() {
    let totalCards = formE.childElementCount;
    // Card to be deleted
    let deleteCard = document.getElementById("card" + currentCardNo);
    deleteCard.remove();
    // Changing the ID's and display information of cards after the deleted card
    for (let cardNo = currentCardNo + 1; cardNo <= totalCards; cardNo++) {
        let card = document.getElementById("card" + cardNo);
        card.id = "card" + (cardNo - 1);
        card.querySelector(".pNo").innerText = cardNo - 1;
    }
    // Update the current card number if necessary
    if (currentCardNo > totalCards - 1) {
        currentCardNo = totalCards - 1;
    }
    showCard(currentCardNo);
    buttons();
}

// Previous Card
function previousCard() {
    if (currentCardNo !== 1) {
        hideCard(currentCardNo);
        currentCardNo -= 1;
        showCard(currentCardNo);
        buttons();
    }
}

// Next Card
function nextCard() {
    // Get total number of form cards
    let totalCards = formE.childElementCount;
    if (currentCardNo !== totalCards) {
        hideCard(currentCardNo);
        currentCardNo++;
        showCard(currentCardNo);
        buttons();
    }
}

// Calling addCard function on clicking add button
addBtn.addEventListener("click", function() {
    addCard();
});

// Calling deleteCard function on clicking delete button
delBtn.addEventListener("click", function() {
    deleteCard();
});

// Calling previousCard function on clicking previous button
prevBtn.addEventListener("click", function() {
    previousCard();
});

// Calling nextCard function on clicking next button
nextBtn.addEventListener("click", function() {
    nextCard();
});
