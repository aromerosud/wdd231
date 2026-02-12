import { products } from '../data/products.mjs';

const container = document.querySelector('#products-cards');
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

const dialog = document.querySelector('#productDialog');
const productDetails = document.querySelector('#productDetails');
const closeBtn = document.querySelector('#closeProductDialog');

// Local Storage: user preference
const savedView = localStorage.getItem('productsView') || 'grid';
setView(savedView);

// Render products
function displayProducts(items) {
    container.innerHTML = '';

    items.forEach(product => {
        const card = document.createElement('section');
        card.classList.add('product-card');

        card.innerHTML = `
  <img src="${product.image}" alt="${product.name}" loading="lazy" width="200" height="auto">
  <h3>${product.name}</h3>
  <p>${product.category}</p>
  <p class="price">$${product.price}</p>
  <button class="details-btn" data-id="${product.id}">Details</button>
`;

        container.appendChild(card);
    });

    // Event delegation
    container.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            const selected = products.find(p => p.id === id);
            openModal(selected);
        });
    });
}

// Modal
function openModal(product) {
    productDetails.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}" loading="lazy">
    <p><strong>Brand:</strong> ${product.brand}</p>
    <p><strong>Category:</strong> ${product.category}</p>
    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
    <p>${product.description}</p>
  `;
    dialog.showModal();
}

closeBtn.addEventListener('click', () => dialog.close());

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

function setView(view) {
    container.className = view;
    localStorage.setItem('productsView', view);

    gridBtn.classList.remove('active');
    listBtn.classList.remove('active');

    if (view === 'grid') {
        gridBtn.classList.add('active');
    } else {
        listBtn.classList.add('active');
    }
}


displayProducts(products);