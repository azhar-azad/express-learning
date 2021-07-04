const { 
  createEmployee, 
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee.controller');

// For advanced search
const Employee = require('../models/Employee');
const advancedResults = require('../middlewares/advancedResults.mw');

// mergeParams is set to true in order to find Department params
const router = require('express').Router({ mergeParams: true });

// /api/v1/employees
router
  .route('/')
  .get(advancedResults(Employee, 'department'), getEmployees)
  .post(createEmployee);

  // /api/v1/employees/:id
router
  .route('/:id')
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;