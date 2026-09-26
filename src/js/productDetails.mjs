import { getLocalStorage, setLocalStorage, alertMessage, updateCartCount } from "./utils.mjs";


export default class ProductDetails {
   constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
   }

   async init() {
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails();

      document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
   }

   addProductToCart() {
      let cart = getLocalStorage('so-cart');

      if (!Array.isArray(cart)) {
         cart = cart ? [cart] : [];
      }

      cart.push(this.product);
      setLocalStorage('so-cart', cart);
      updateCartCount();
      alertMessage(`${this.product.Name} added to cart!`);
   }

   renderProductDetails() {
      document.querySelector('#productBrand').innerText = this.product.Brand.Name;
      document.querySelector('#productName').innerText = this.product.NameWithoutBrand;
      document.querySelector('#productImage').src = this.product.Images.PrimaryLarge;
      document.querySelector('#productImage').alt = this.product.Name;
      document.querySelector('#productFinalPrice').innerText = `$${this.product.FinalPrice}`;
      document.querySelector('#productColorName').innerText = this.product.Colors[0].ColorName;
      document.querySelector('#productDescriptionHtmlSimple').innerHTML = this.product.DescriptionHtmlSimple;
   }
}