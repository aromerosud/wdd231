const spotlightContainer = document.querySelector('#spotlights');

const membersURL = 'data/members.json';

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);
    const data = await response.json();

    // Filter only Silver (2) and Gold (3) members
    const qualifiedMembers = data.members.filter(
      member => member.level === 2 || member.level === 3
    );

    // Shuffle members randomly
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

    // Select 2 or 3 members randomly
    const spotlightCount = Math.random() < 0.5 ? 2 : 3;
    const selectedMembers = shuffled.slice(0, spotlightCount);

    // Display spotlights
    selectedMembers.forEach(member => {
      spotlightContainer.appendChild(createSpotlightCard(member));
    });

  } catch (error) {
    console.error('Error loading spotlight data:', error);
  }
}

function createSpotlightCard(member) {
  const card = document.createElement('section');
  card.classList.add('spotlight-card');

  const levelText =
    member.level === 3 ? 'Gold Member' : 'Silver Member';

  card.innerHTML = `
    <h3>${member.name}</h3>
    <p class="member-level">${levelText}</p>

    <div class="spotlight-content">
      <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
      <div class="spotlight-info">
        <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
        <p><strong>Phone:</strong> ${member.phonenumber}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      </div>
    </div>
  `;

  return card;
}

getSpotlights();