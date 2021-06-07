/**
 * @Path: /categories
 * @Description:
 * */
const categoryRouter = require('express').Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

/**
 * @URL: http://localhost:5000/api/{version}/categories
 * @Description: Create a new Category entity
 * @Method: POST
* */
categoryRouter.post('/', createCategory);

/**
 * @URL: http://localhost:5000/api/{version}/categories
 * @Description: Get all Category entities
 * @Method: GET
 * */
categoryRouter.get('/', getCategories);

/**
 * @URL: http://localhost:5000/api/{version}/categories/{categoryId}
 * @Description: Get a Category entity by id
 * @Method: GET
 * */
categoryRouter.get('/:id', getCategory);

/**
 * @URL: http://localhost:5000/api/{version}/categories/{categoryId}
 * @Description: Update a Category entity by id
 * @Method: PUT
 * */
categoryRouter.put('/:id', updateCategory);

/**
 * @URL: http://localhost:5000/api/{version}/categories/{categoryId}
 * @Description: Delete a Category entity by id
 * @Method: DELETE
 * */
categoryRouter.delete('/:id', deleteCategory);

module.exports = categoryRouter;