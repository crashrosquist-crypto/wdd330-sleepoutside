// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// helper to get a parameter from the URL string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function alertMessage(message, scroll = true) {
  // First make container...
  const alert = document.createElement("div");
  alert.classList.add("alert");

  // Populate inner content with a close button
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // Event listener
  alert.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" || e.target.classList.contains("alert")) {
      main.removeChild(alert);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0,0);
  }

  setTimeout(() => {
    if (main.contains(alert)) {
      main.removeChild(alert);
    }
  }, 4000);
}

// updates the superscript badge on the cart/backpack icon with the
// number of items currently stored in the cart
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const count = Array.isArray(cartItems) ? cartItems.length : 0;

  const cartCountElement = qs(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}