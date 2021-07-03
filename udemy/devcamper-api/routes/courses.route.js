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

// This is to protect routes, user has to be logged in to access those routes.
const { protect } = require('../middlewares/auth.middleware');

router.route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }), 
    getCourses
  )
  .post(protect, createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;