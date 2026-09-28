import { setLocalStorage, getLocalStorage, alertMessage, renderCartCount } from "./utils.mjs";

const baseURL = "https://wdd330-backend-osp8.onrender.com/";

function prepareImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Strip leading relative path dots like "../" or "./"
  const cleanPath = path.replace(/^(\.\.\/|\.\/)/, "");
  return `${baseURL}${cleanPath}`;
}

function productTemplate(product) {
  const imageSrc = product.Images?.PrimaryLarge || product.Images?.PrimaryMedium || product.Image || "";
  const fullImageSrc = prepareImageUrl(imageSrc);

  return `
    <h3>${product.Brand?.Name || ""}</h3>
    <h2 class="divider">${product.NameWithoutBrand || product.Name}</h2>
    <img
      class="divider"
      src="${fullImageSrc}"
      alt="${product.NameWithoutBrand || product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || ""}</p>
    <p class="product__description">${product.ItemDescriptionHtmlSimple || ""}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Fetch product data using dataSource
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. Render details into <section class="product-detail">
    this.renderProductDetails(".product-detail");

    // 3. Attach click listener to "Add to Cart" button
    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.addEventListener("click", this.addToCart.bind(this));
    }
  }

  addToCart() {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);

    alertMessage(`${this.product.NameWithoutBrand || this.product.Name} added to cart!`);
    renderCartCount();
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = productTemplate(this.product);
    }
  }
}