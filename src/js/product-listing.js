import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const alert = new Alert();
alert.init();

const category = getParam('category');

const listElement = document.querySelector('.product-list');
const dataSource = new ProductData();

const productList = new ProductList(category, dataSource, listElement);
productList.init();

const titleElement = document.querySelector('.title');
if (titleElement && category) {
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
  titleElement.textContent = `Top Products: ${formattedCategory}`;
}
