const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories.controller');
const { protect, authorize } = require('../middlewares/auth.mw');

// Include other resource routers
const productsRouter = require('./products.route');

const Category = require('../models/Category');
const advancedResults = require('../middlewares/advancedResults');

const router = require('express').Router();

// Re-route into other resource routers
router.use('/:categoryId/products', productsRouter);

router.route('/')
  .get(advancedResults(Category), getCategories)
  .post(protect, authorize('admin'), createCategory);

router.route('/:id')
  .get(getCategory)
  .put(protect, authorize('admin'), updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;