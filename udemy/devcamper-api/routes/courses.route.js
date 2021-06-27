const { 
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses.controller');

// For middleware
const Course = require('../models/Course');
const advancedResults = require('../middlewares/advancedResults');

// mergeParams is set to true in order to find the params from calling router
const router = require('express').Router({ mergeParams: true }); 

router.route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }), 
    getCourses
  )
  .post(createCourse);

router.route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;