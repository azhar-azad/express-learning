const { 
  getCourses
} = require('../controllers/courses.controller');

// mergeParams is set to true in order to find the params from calling router
const router = require('express').Router({ mergeParams: true }); 

router.route('/').get(getCourses);

module.exports = router;