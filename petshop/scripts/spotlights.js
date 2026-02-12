import { petSpotlights } from '../data/petspotlights.mjs';

const spotlightContainer = document.querySelector('#spotlights');

function getSpotlights() {
    // Filter only Silver (2) and Gold (3)
    const qualified = petSpotlights.filter(
        item => item.level === 2 || item.level === 3
    );

    // Shuffle
    const shuffled = qualified.sort(() => 0.5 - Math.random());

    // Select 2 or 3
    const spotlightCount = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, spotlightCount);

    // Clear container
    spotlightContainer.innerHTML = '';

    // Render
    selected.forEach(item => {
        spotlightContainer.appendChild(createSpotlightCard(item));
    });
}

function createSpotlightCard(item) {
    const card = document.createElement('section');
    card.classList.add('spotlight-card');

    const levelText =
        item.level === 3 ? 'Gold Partner' : 'Silver Partner';

    card.innerHTML = `
    <h3>${item.name}</h3>
    <p class="member-level">${levelText}</p>

    <div class="spotlight-content">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="spotlight-info">
        <p><strong>Service:</strong> ${item.service}</p>
        <p><strong>Phone:</strong> ${item.phone}</p>
        <p><strong>Email:</strong> <a href="mailto:${item.email}">${item.email}</a></p>
        <p><strong>Website:</strong> <a href="${item.website}" target="_blank">${item.website}</a></p>
        <p class="spotlight-desc">${item.information}</p>
      </div>
    </div>
  `;

    return card;
}

getSpotlights();