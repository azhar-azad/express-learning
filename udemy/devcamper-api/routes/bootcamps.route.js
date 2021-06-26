const { 
  getBootcamps, 
  getBootcamp ,
  createBootcamp, 
  updateBootcamp,
  deleteBootcamp, 
  getBootcampsInRadius
} = require('../controllers/bootcamps.controller');

const router = require('express').Router();

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router 
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;

// router.get('/', getBootcamps);

// router.get('/:id', getBootcamp);

// router.post('/', createBootcamp);

// router.put('/:id', updateBootcamp);

// router.delete('/:id', deleteBootcamp);



