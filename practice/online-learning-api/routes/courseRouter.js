const express = require('express');

const {
  createCourse,
  getCourses,
  deleteCourse
} = require('../controllers/courseController.js');

const courseRouter = express.Router();

// CREATE COURSE
courseRouter.post('/', createCourse);

// GET ALL COURSES
courseRouter.get('/', getCourses);

// DELETE COURSE BY ID
courseRouter.delete('/:id', deleteCourse);

module.exports = courseRouter;