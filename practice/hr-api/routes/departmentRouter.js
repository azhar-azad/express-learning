const express = require('express');
const {
  createDepartment,
  getDepartments
} = require('../controllers/departmentController.js');

const departmentRouter = express.Router();

// CREATE DEPARTMENT
departmentRouter.post('/', createDepartment);

// GET ALL DEPARTMENTS
departmentRouter.get('/', getDepartments);

module.exports = departmentRouter;