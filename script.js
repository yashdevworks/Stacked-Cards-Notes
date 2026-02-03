console.log("js loaded")
// ALL VARIABLES AND DOC SELECTION


let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");

const stack = document.querySelector(".stack-wrapper");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");


// Form
const form = document.querySelector("form");

// Inputs
const imageInput = document.querySelector('input[placeholder="https://example.com/image.jpg"]');
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="Quick appointment note"]');

// Radio buttons (all categories)
const categoryRadios = document.querySelectorAll('input[name="category"]');

// Buttons
const createBtn = document.querySelector(".create-btn");
const closeBtn = document.querySelector(".close-btn");


// CODE STARTS HERE

function saveToLocalStorage(obj) {
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks))
    } else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks))
    }
}

addNote.addEventListener("click", function () {
    formContainer.style.display = "initial";
})

closeBtn.addEventListener("click", function () {
    formContainer.style.display = "none";
})

form.addEventListener("submit", function (evt) {
    evt.preventDefault()
    const imageUrl = imageInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const homeTown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();

    let selected = false;
    categoryRadios.forEach(function (cat) {
        if (cat.checked) {
            selected = cat.value
        }
    })

    if (imageUrl === "") {
        alert("Please enter an Image URL.");
        return;
    }

    if (fullName === "") {
        alert("Please enter Full Name.");
        return;
    }

    if (homeTown === "") {
        alert("Please enter Home Town.");
        return;
    }

    if (purpose === "") {
        alert("Please enter Purpose.");
        return;
    }

    if (!selected) {
        alert("Please select a category")
    }

    saveToLocalStorage({
        imageUrl,
        fullName,
        homeTown,
        purpose,
        selected,
    })

    form.reset();
    formContainer.style.display = "none";
    showCards()
})

function showCards() {
    stack.innerHTML = "";

    let allTasks = JSON.parse(localStorage.getItem("tasks"))

    allTasks.forEach(function (task, index) {

        // card
        const card = document.createElement("div");
        card.classList.add("card");
        if (index === 0) card.classList.add("stack-1");
        else if (index === 1) card.classList.add("stack-2");
        else if (index === 2) card.classList.add("stack-3");

        // card-header
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");

        // avatar image
        const avatar = document.createElement("img");
        avatar.src = task.imageUrl;
        avatar.classList.add("avatar");

        // name
        const name = document.createElement("h2");
        name.textContent = task.fullName;

        // append header elements
        cardHeader.append(avatar, name);

        // card-info
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");

        // home town block
        const homeDiv = document.createElement("div");

        const homeLabel = document.createElement("p");
        homeLabel.classList.add("label");
        homeLabel.textContent = "Home town";

        const homeText = document.createElement("p");
        homeText.textContent = task.homeTown;

        homeDiv.append(homeLabel, homeText);

        // bookings block
        const bookingDiv = document.createElement("div");

        const bookingLabel = document.createElement("p");
        bookingLabel.classList.add("label");
        bookingLabel.textContent = "Purpose";

        const bookingText = document.createElement("p");
        bookingText.textContent = task.purpose;

        bookingDiv.append(bookingLabel, bookingText);

        // append info blocks
        cardInfo.append(homeDiv, bookingDiv);

        // card-actions
        const cardActions = document.createElement("div");
        cardActions.classList.add("card-actions");

        // call button
        const callBtn = document.createElement("button");
        callBtn.classList.add("btn", "call");
        callBtn.textContent = "📞 Call";

        // message button
        const msgBtn = document.createElement("button");
        msgBtn.classList.add("btn", "message");
        msgBtn.textContent = "Message";

        // append buttons
        cardActions.append(callBtn, msgBtn);

        // assemble card
        card.append(cardHeader, cardInfo, cardActions);

        // finally add to page
        document.querySelector(".stack-wrapper").appendChild(card);


    })
}
showCards();

function updateStack() {
    const cards = document.querySelectorAll(".stack-wrapper .card")

    cards.forEach(card => {
        card.style.zIndex = 0;
        card.style.transform = "translateY(0) scale(1)";
        card.style.opacity = 0;
    });

    for(i = 0; i < 3; i++){
        cards[i].style.zIndex = 3 - i;
        cards[i].style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
        cards[i].style.opacity = `${1 - i * 0.02}`
    }
}

upBtn.addEventListener("click", function () {
    const lastChild = stack.lastElementChild;
    if (lastChild) {
        stack.insertBefore(lastChild, stack.firstElementChild)
    }
    // update
    updateStack()
})


downBtn.addEventListener("click", function () {
    const firstChild = stack.firstElementChild;
    if (firstChild) {
        stack.append(firstChild)
    }
    // update
    updateStack()
})
