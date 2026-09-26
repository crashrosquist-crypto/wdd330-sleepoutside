import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.mjs";
import { updateCartCount } from "./utils.mjs";

const alert = new Alert();
alert.init();
const listElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();

updateCartCount();