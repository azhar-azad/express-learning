const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products.controller');
const { protect, authorize } = require('../middlewares/auth.mw');

const Product = require('../models/Product');
const advancedResults = require('../middlewares/advancedResults');

const reviewsRouter = require('./reviews.route');

const router = require('express').Router({ mergeParams: true });

router.use('/:productId/reviews', reviewsRouter);

router.route('/')
  .get(advancedResults(
    Product, [
      { path: 'category', select: 'name' },
      { path: 'user', select: 'fullName' }
    ]
  ), getProducts)
  .post(protect, authorize('seller', 'admin'), createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('seller', 'admin'), updateProduct)
  .delete(protect, authorize('seller', 'admin'), deleteProduct);

module.exports = router;