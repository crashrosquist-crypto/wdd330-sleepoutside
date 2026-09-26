import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

<<<<<<< HEAD
const productId = getParam('product');
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
product.init();
=======
loadHeaderFooter();

const dataSource = new ProductData('tents');
const productID = getParam('product');

const product = new ProductDetails(productID, dataSource);
product.init();
>>>>>>> origin/main
