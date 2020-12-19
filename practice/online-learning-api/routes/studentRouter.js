const express = require('express');

const {
  createStudent,
  getStudents
} = require('../controllers/studentController.js');

const studentRouter = express.Router();

// CREATE STUDENT
studentRouter.post('/', createStudent);

// GET ALL STUDENTS
studentRouter.get('/', getStudents);

module.exports = studentRouter;