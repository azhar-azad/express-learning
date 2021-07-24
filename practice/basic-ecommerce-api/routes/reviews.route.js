const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews.controller');
const { protect, authorize } = require('../middlewares/auth.mw');

const Review = require('../models/Review');
const advancedResults = require('../middlewares/advancedResults');

const router = require('express').Router({ mergeParams: true });

router.route('/')
  .get(advancedResults(
    Review, [
      { path: 'product', select: 'name' },
      { path: 'user', select: 'fullName' }
    ]
  ), getReviews)
  .post(protect, authorize('user'), createReview);

router.route('/:id')
  .get(getReview)
  .put(protect, authorize('user'), updateReview)
  .delete(protect, authorize('user'), deleteReview);

module.exports = router;