import { discoverItems } from "../data/discover.mjs";
import { openModal } from "./modal.js";

const grid = document.querySelector('#discoverGrid');

discoverItems.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
    <h2 class="card-title">${item.name}</h2>
    <figure class="card-image">
        <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
            width="300"
            height="200"
        >
    </figure>
    <div class="card-content">
        <p class="card-description">
            ${item.description}
        </p>
        <address class="card-address">
            ${item.address}, ${item.district}, ${item.city}
        </address>
    </div>

    <div class="card-button">
        <button type="button">Learn More</button>
    </div>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => {
        openModal(item);
    });

    grid.appendChild(card);
});

// LocalStorage
const messageBox = document.querySelector("#visitorMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    messageBox.textContent = "Welcome! Let us know if you have any questions."
} else {
    const diffTime = now - Number(lastVisit);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        messageBox.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        messageBox.textContent = "You last visited 1 day ago."
    } else {
        messageBox.textContent = `You last visited ${diffDays} days ago.`
    }
}



localStorage.setItem("lastVisit", now);