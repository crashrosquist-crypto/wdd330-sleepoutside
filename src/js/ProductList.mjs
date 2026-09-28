import { renderListWithTemplate } from "./utils.mjs";

const baseURL = "https://wdd330-backend-osp8.onrender.com/";

function prepareImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Clean up leading relative dots like '../' or './'
  const cleanPath = path.replace(/^(\.\.\/|\.\/)/, "");
  return `${baseURL}${cleanPath}`;
}

function productCardTemplate(product) {
  if (!product || !product.Id) {
    console.error("Invalid product structure detected:", product);
    return "";
  }

  // Safely extract image path from nested Images object
  const imagePath = product.Images?.PrimaryMedium || product.Images?.PrimaryLarge || product.Image || "";
  const imageUrl = prepareImageUrl(imagePath);

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${imageUrl}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand?.Name || ""}</h2>
      <h3 class="card__name">${product.NameWithoutBrand || product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    // Pass template function, parent element, list data, and clear previous contents
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}