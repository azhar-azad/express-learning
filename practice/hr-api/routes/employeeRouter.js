const express = require('express');
const {
  createEmployee,
  getEmployees
} = require('../controllers/employeeController.js');

const employeeRouter = express.Router();

// CREATE EMPLOYEE
employeeRouter.post('/', createEmployee);

// GET ALL EMPLOYEES
employeeRouter.get('/', getEmployees);

module.exports = employeeRouter;