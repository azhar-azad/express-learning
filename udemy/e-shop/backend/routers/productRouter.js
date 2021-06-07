/**
 * @Path: /products
 * @Description:
 * */
const productRouter = require('express').Router();
const {
  createProduct,
  getProducts,
  getProductsSelectiveFields,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getProductFeatured,
  getProductFeaturedLimited
} = require('../controllers/productController');

/**
 * @URL: http://localhost:5000/api/{version}/products
 * @Description: Create a new Product entity
 * @Method: POST
* */
productRouter.post('/', createProduct);

/**
 * @URL: http://localhost:5000/api/{version}/products
 * @Description: Get all Product entities
 * @Method: GET
 * @Special: This API can return Products by Category | Category Ids are sent via query parameters
 * */
productRouter.get('/', getProducts);

/**
 * @URL: http://localhost:5000/api/{version}/products/selective
 * @Description: Get all Product entities but not all fields
 * @Method: GET
 * */
productRouter.get('/get/selective', getProductsSelectiveFields);

/**
 * @URL: http://localhost:5000/api/{version}/products
 * @Description: Get a Product entity
 * @Method: GET
 * */
productRouter.get('/:id', getProduct);

/**
 * @URL: http://localhost:5000/api/{version}/products/{productId}
 * @Description: Update a Product entity by id
 * @Method: PUT
 * */
productRouter.put('/:id', updateProduct);

/**
 * @URL: http://localhost:5000/api/{version}/products/{productId}
 * @Description: Delete a Product entity by id
 * @Method: DELETE
 * */
productRouter.delete('/:id', deleteProduct);

/**
 * @URL: http://localhost:5000/api/{version}/products/get/count
 * @Description: Get count of Product entities
 * @Method: GET
 * */
productRouter.get('/get/count', getProductCount);

/**
 * @URL: http://localhost:5000/api/{version}/products/get/featured
 * @Description: Get only the featured products
 * @Method: GET
 * */
productRouter.get('/get/featured', getProductFeatured);

/**
 * @URL: http://localhost:5000/api/{version}/products/get/featured/{count}
 * @Description: Get x number of featured products where x={count}
 * @Method: GET
 * */
productRouter.get('/get/featured/:count', getProductFeaturedLimited);

module.exports = productRouter;