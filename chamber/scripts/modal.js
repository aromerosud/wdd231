const dialog = document.querySelector("#discoverDialog");

export function openModal(item) {
    dialog.innerHTML = `
    <form method="dialog" class="dialog-content">
      <button id="closeModal-discover">❌</button>

      <h3>${item.name}</h3>

      <img 
        src="${item.image}" 
        alt="${item.name}" 
        width="300"
        height="200"
      >

      <p>${item.description}</p>

      <address>
        ${item.address}, ${item.district}, ${item.city}, ${item.country}
      </address>

      <p><strong>Hours:</strong> ${item.hours || "Not available"}</p>
      <p><strong>Phone:</strong> ${item.phone || "Not available"}</p>

      ${item.website
            ? `<p><a href="${item.website}" target="_blank" rel="noopener">Visit Website</a></p>`
            : ""
        }
    </form>
  `;

    dialog.showModal();
}