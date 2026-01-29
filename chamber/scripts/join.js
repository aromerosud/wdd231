const url = 'data/levels.json';

const cardsContainer = document.querySelector("#membership-cards");
const membershipDetails = document.querySelector("#membership-details");

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    createMembershipCards(data.membershipLevels);
}

function createMembershipCards(levels) {
    cardsContainer.innerHTML = "";

    levels.forEach((level, index) => {
        const card = document.createElement("article");
        card.classList.add("membership-card");
        card.classList.add(level.key);

        card.innerHTML = `
          <h3>${level.title}</h3>
          <p>${level.shortDescription}</p>
          <button>Learn More</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            displayMembershipDetails(level);
        });

        cardsContainer.appendChild(card);

        setTimeout(() => {
            card.classList.add("show");
        }, 50 + index * 150);
    });
}

function displayMembershipDetails(level) {
    membershipDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h3>${level.title}</h3>
        <p><strong>Cost:</strong> ${level.cost}</p>
        <ul>
            ${level.benefits.map(b => `<li>${b}</li>`).join("")}
        </ul>
    `;

    membershipDetails.showModal();

    document.querySelector("#closeModal").addEventListener("click", () => {
        membershipDetails.close();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.querySelector('#timestamp');

    const now = new Date();
    timestampField.value = now.toLocaleString();
});

getMemberData();