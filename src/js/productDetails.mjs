import { getLocalStorage, setLocalStorage } from "./utils.mjs"; 

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        console.log("Current Product ID from URL:", this.productId);
        
        // Fetch product details
        this.product = await this.dataSource.findProductById(this.productId);

        // Render HTML
        this.renderProductDetails();

        // Add event listener to cart button
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const productCart = getLocalStorage("so-cart") || [];
        productCart.push(this.product);
        setLocalStorage("so-cart", productCart);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.getElementById('productBrand').textContent = product.Brand.Name;
    document.getElementById('productName').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productFinalPrice').textContent = `$${product.FinalPrice}`;
    document.getElementById('productColorName').textContent = product.Colors[0].ColorName;
    document.getElementById('productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}