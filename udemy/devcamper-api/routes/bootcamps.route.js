const { 
  getBootcamps, 
  getBootcamp ,
  createBootcamp, 
  updateBootcamp,
  deleteBootcamp, 
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps.controller');

// For middleware
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults');

// Include other resource routers
const courseRouter = require('./courses.route');

const router = require('express').Router();

// protect: to protect routes, user has to be logged in to access those routes.
// authorize: to authorize certain routes to certain user roles. 
const { protect, authorize } = require('../middlewares/auth.middleware');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius); // anyone can access

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload); // logged-in user with authorized role can access

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses, user'), getBootcamps) // anyone can access
  .post(protect, authorize('publisher', 'admin'), createBootcamp); // logged-in user with authorized role can access

router 
  .route('/:id')
  .get(getBootcamp) // anyone can access
  .put(protect, authorize('publisher', 'admin'), updateBootcamp) // logged-in user with authorized role can access
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp); // logged-in user with authorized role can access

module.exports = router;
