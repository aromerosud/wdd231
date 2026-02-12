const galleryGrid = document.getElementById("servicesGrid");

const petDialog = document.getElementById("petDialog");
const closePetDialog = document.getElementById("closePetDialog");
const petDetails = document.getElementById("petDetails");

const API_KEY = "live_WMtziKs5RoDPsgTvjLHMAUZ6PclFhcMPyzFVGcbjkE4MlQMqtBFRRLnuAdBYShfT";

const DOG_API_URL = "https://api.thedogapi.com/v1/breeds";
const CAT_API_URL = "https://api.thecatapi.com/v1/breeds";

// Care tips
function getDogCareTips(weightMetric) {
    const avgWeight = parseInt(weightMetric?.split(" - ")[0]) || 15;

    if (avgWeight < 10) {
        return "Small dog: Daily short walks, dental care, and gentle grooming.";
    } else if (avgWeight < 25) {
        return "Medium dog: Regular exercise, balanced diet, and weekly grooming.";
    } else {
        return "Large dog: Daily long walks, joint care, and proper weight management.";
    }
}

// Care tips
function getCatCareTips() {
    return "Cats need a clean litter box, regular brushing, mental stimulation, and routine vet checkups.";
}

async function getDogs() {
    const response = await fetch(DOG_API_URL, {
        headers: { "x-api-key": API_KEY }
    });
    if (!response.ok) throw new Error("Failed to fetch dogs");
    return await response.json();
}

async function getCats() {
    const response = await fetch(CAT_API_URL, {
        headers: { "x-api-key": API_KEY }
    });
    if (!response.ok) throw new Error("Failed to fetch cats");
    return await response.json();
}

function getCatImageUrl(cat) {
    if (!cat.reference_image_id) {
        return "images/placeholder-cat.jpg";
    }

    return `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`;
}

function createDogCard(dog) {
    const card = document.createElement("div");
    card.classList.add("pet-card");

    const careTips = getDogCareTips(dog.weight?.metric);

    card.innerHTML = `
    <img src="${dog.image.url}" alt="${dog.name}">
    <div class="pet-info">
      <h3>${dog.name}</h3>
      <p><strong>Type:</strong> Dog</p>
      <p><strong>Temperament:</strong> ${dog.temperament || "Friendly"}</p>
      <p><strong>Life span:</strong> ${dog.life_span || "N/A"}</p>

      <div class="pet-badges">
        <span class="pet-badge">${dog.breed_group || "Companion"}</span>
        <span class="pet-badge">${dog.origin || "Various"}</span>
      </div>

      <button class="learn-more">Learn More</button>
    </div>
  `;

    card.querySelector(".learn-more")
        .addEventListener("click", () => openDogModal(dog, careTips));

    return card;
}

function createCatCard(cat) {
    const card = document.createElement("div");
    card.classList.add("pet-card");

    const imageUrl = getCatImageUrl(cat);
    const careTips = getCatCareTips();

    card.innerHTML = `
    <img src="${imageUrl}" alt="${cat.name}">
    <div class="pet-info">
      <h3>${cat.name}</h3>
      <p><strong>Type:</strong> Cat</p>
      <p><strong>Temperament:</strong> ${cat.temperament || "Calm"}</p>
      <p><strong>Origin:</strong> ${cat.origin || "N/A"}</p>

      <div class="pet-badges">
        <span class="pet-badge">Cat Breed</span>
        <span class="pet-badge">${cat.origin || "Various"}</span>
      </div>

      <button class="learn-more">Learn More</button>
    </div>
  `;

    card.querySelector(".learn-more")
        .addEventListener("click", () => openCatModal(cat, careTips));

    return card;
}

function openDogModal(dog, careTips) {
    petDetails.innerHTML = `
    <h2>${dog.name} (Dog)</h2>
    <img src="${dog.image.url}" alt="${dog.name}">

    <ul>
      <li><strong>Breed Group:</strong> ${dog.breed_group || "Companion"}</li>
      <li><strong>Temperament:</strong> ${dog.temperament || "Friendly"}</li>
      <li><strong>Life Span:</strong> ${dog.life_span || "N/A"}</li>
      <li><strong>Height:</strong> ${dog.height?.metric || "N/A"} cm</li>
      <li><strong>Weight:</strong> ${dog.weight?.metric || "N/A"} kg</li>
      <li><strong>Bred For:</strong> ${dog.bred_for || "Companionship"}</li>
    </ul>

    <h3>Basic Care Tips</h3>
    <p>${careTips}</p>
  `;

    petDialog.showModal();
}

function openCatModal(cat, careTips) {
    const imageUrl = getCatImageUrl(cat);

    petDetails.innerHTML = `
    <h2>${cat.name} (Cat)</h2>
    <img src="${imageUrl}" alt="${cat.name}">

    <ul>
      <li><strong>Origin:</strong> ${cat.origin || "N/A"}</li>
      <li><strong>Temperament:</strong> ${cat.temperament || "Calm"}</li>
      <li><strong>Description:</strong> ${cat.description || "N/A"}</li>
      <li><strong>Life Span:</strong> ${cat.life_span || "N/A"} years</li>
    </ul>

    <h3>Basic Care Tips</h3>
    <p>${careTips}</p>
  `;

    petDialog.showModal();
}

closePetDialog.addEventListener("click", () => {
    petDialog.close();
});

async function loadPetGallery() {
    try {
        const [dogs, cats] = await Promise.all([
            getDogs(),
            getCats()
        ]);

        galleryGrid.innerHTML = "";

        const dogCards = dogs
            .filter(d => d.image && d.image.url)
            .slice(0, 6)
            .map(createDogCard);

        const catCards = cats
            .slice(0, 6)
            .map(createCatCard);

        const mixedCards = [...dogCards, ...catCards]
            .sort(() => Math.random() - 0.5);

        mixedCards.forEach(card => galleryGrid.appendChild(card));

    } catch (error) {
        console.error(error);
        galleryGrid.innerHTML = "<p>Unable to load pet gallery at this time.</p>";
    }
}

loadPetGallery();