const { 
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses.controller');

// mergeParams is set to true in order to find the params from calling router
const router = require('express').Router({ mergeParams: true }); 

router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;