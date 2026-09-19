import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";
const listElement = document.querySelector(".product-list");
const dataSource = new ProductData();

const productList = new ProductList(category, dataSource, listElement);
productList.init();

document.querySelector("#title-header").textContent =
    `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;