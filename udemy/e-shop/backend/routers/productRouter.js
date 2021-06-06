/**
 * @Path: /products
 * @Description:
 * */
const productRouter = require('express').Router();
const {
  createProduct,
  getProducts
} = require('../controllers/productController');

/**
 * @URL: http://localhost:5000/api/{version}/products
 * @Description: Create a new Product entity
* */
productRouter.post('/', createProduct);

/**
 * @URL: http://localhost:5000/api/{version}/products
 * @Description: Get all Product entities
 * */
productRouter.get('/', getProducts);

module.exports = productRouter;