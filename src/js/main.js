import ProductData from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const alert = new Alert();
alert.init();


const listElement = document.querySelector('.product-list');
const dataSource = new ProductData('tents');

const productList = new ProductList('tents', dataSource, listElement);
productList.init();
