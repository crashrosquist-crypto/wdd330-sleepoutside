import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

// Calculate totals when zip code field loses focus
const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", () => {
    myCheckout.calculateOrderTotal();
  });
}

// Form submit handler
const form = document.querySelector("#checkoutForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const status = form.checkValidity();
    form.reportValidity();

    if (status) {
      myCheckout.calculateOrderTotal();
      try {
        const res = await myCheckout.checkout(form);
        console.log("Order submitted successfully:", res);
      } catch (err) {
        console.error("Order submission error:", err);
      }
    }
  });
}