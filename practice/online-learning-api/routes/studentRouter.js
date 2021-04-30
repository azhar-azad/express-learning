const express = require('express');

const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController.js');

const studentRouter = express.Router();

// CREATE STUDENT
studentRouter.post('/', createStudent);

// GET ALL STUDENTS
studentRouter.get('/', getStudents);

// GET STUDENT
studentRouter.get('/:id', getStudent);

// UPDATE STUDENT
studentRouter.patch('/:id', updateStudent);

//DELETE STUDENT
studentRouter.delete('/:id', deleteStudent);

module.exports = studentRouter;