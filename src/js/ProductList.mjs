import { renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    // Log each product to inspect missing properties in DevTools
    console.log('Rendering product card:', product);

    if (!product || !product.Id) {
        console.error('Invalid product structure detected:', product);
        return '';
    }

    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand?.Name || ''}</h2>
      <h3 class="card__name">${product.Name}</h3>
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
            renderWithTemplate(productCardTemplate, this.listElement, list);
        }
    }
