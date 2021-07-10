const {
  getReviews,
  getReview,
  createReview
} = require('../controllers/reviews.controller');

// For middleware
const Review = require('../models/Review');
const advancedResults = require('../middlewares/advancedResults');

// mergeParams is set to true in order to find the params from calling router
const router = require('express').Router({ mergeParams: true });

// protect: to protect routes, user has to be logged in to access those routes.
// authorize: to authorize certain routes to certain user roles.
const { protect, authorize } = require('../middlewares/auth.middleware');

router.route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  ) // anyone can access
  .post(protect, authorize('user', 'admin'), createReview); // logged-in user with authorized role can access

router.route('/:id')
  .get(getReview) // anyone can access
//   .put(protect, authorize('publisher', 'admin'), updateCourse) // logged-in user with authorized role can access
//   .delete(protect, authorize('publisher', 'admin'), deleteCourse); // logged-in user with authorized role can access

module.exports = router;