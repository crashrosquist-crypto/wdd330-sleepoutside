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

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
}

export function alertMessage(message, scroll = true) {
  // First make container...
  const main = document.querySelector("main");
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

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
