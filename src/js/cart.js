import { getLocalStorage, setLocalStorage, loadHeaderFooter, alertMessage } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const productList = document.querySelector('.product-list');
  const cartFooter = document.querySelector('.cart-footer');

  if (cartItems.length > 0) {
    // Render list items
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join('');

    // Render total sum and reveal footer
    renderCartTotal(cartItems);
  } else {
    productList.innerHTML = '<p>Your cart is empty.</p>';
    if (cartFooter) cartFooter.classList.add('hide');
    alertMessage('Your cart is currently empty.');
  }
}

function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector('.cart-footer');
  const totalElement = document.querySelector('.list-total');

  // Sum FinalPrice across all items in storage
  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice || 0), 0);

  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  if (cartFooter) {
    cartFooter.classList.remove('hide');
  }
}

function cartItemTemplate(item) {
  const imageSrc = item.Images?.PrimaryMedium || item.Image || '';
  const colorName = item.Colors?.[0]?.ColorName || '';
  const productLink = `/product_pages/index.html?product=${item.Id}`;

  return `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}">❌</span>
  <a href="${productLink}" class="cart-card__image">
    <img src="${imageSrc}" alt="${item.Name}" />
  </a>
  <a href="${productLink}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
</li>`;
}

function removeItemFromCart(id) {
  let cartItems = getLocalStorage('so-cart') || [];
  
  // Find index of the first item with matching ID and remove it
  const index = cartItems.findIndex((item) => item.Id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  // Save back to local storage and re-render cart contents
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

// Event delegation listener for the remove button clicks
const productListElement = document.querySelector('.product-list');
if (productListElement) {
  productListElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-card__remove')) {
      const idToRemove = e.target.dataset.id;
      removeItemFromCart(idToRemove);
    }
  });
}

renderCartContents();