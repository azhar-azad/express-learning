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

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload); 

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses, user'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router 
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;

// router.get('/', getBootcamps);

// router.get('/:id', getBootcamp);

// router.post('/', createBootcamp);

// router.put('/:id', updateBootcamp);

// router.delete('/:id', deleteBootcamp);



