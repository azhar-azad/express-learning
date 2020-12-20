const express = require('express');

const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController.js');

const courseRouter = express.Router();

// CREATE COURSE
courseRouter.post('/', createCourse);

// GET ALL COURSES
courseRouter.get('/', getCourses);

// GET REVIEW
courseRouter.get('/:id', getCourse);

// UPDATE REVIEW
courseRouter.patch('/:id', updateCourse);

// DELETE COURSE BY ID
courseRouter.delete('/:id', deleteCourse);

module.exports = courseRouter;