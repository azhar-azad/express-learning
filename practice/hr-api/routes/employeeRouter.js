const express = require('express');
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController.js');

const employeeRouter = express.Router();

// CREATE EMPLOYEE
employeeRouter.post('/', createEmployee);

// GET ALL EMPLOYEES
employeeRouter.get('/', getEmployees);

// GET EMPLOYEE BY ID
employeeRouter.get('/:id', getEmployee);

// UPDATE EMPLOYEE BY ID
employeeRouter.put('/:id', updateEmployee);

// DELETE EMPLOYEE BY ID
employeeRouter.delete('/:id', deleteEmployee);

module.exports = employeeRouter;