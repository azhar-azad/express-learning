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

// This is to protect routes, user has to be logged in to access those routes.
const { protect } = require('../middlewares/auth.middleware');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect, bootcampPhotoUpload); 

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);

router 
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;

// router.get('/', getBootcamps);

// router.get('/:id', getBootcamp);

// router.post('/', createBootcamp);

// router.put('/:id', updateBootcamp);

// router.delete('/:id', deleteBootcamp);



