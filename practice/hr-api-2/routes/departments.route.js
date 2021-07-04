const { 
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departments.controller');

// For advance search
const Department = require('../models/Department');
const advancedResults = require('../middlewares/advancedResults.mw');

const router = require('express').Router();

// Include nested resource routes
const employeeRouter = require('./employees.route');

// Re-route into other resource routes
router.use('/:departmentId/employees', employeeRouter);

router
  .route('/')
  .get(advancedResults(Department), getDepartments)
  .post(createDepartment);

router
  .route('/:id')
  .get(getDepartment)
  .put(updateDepartment)
  .delete(deleteDepartment);

module.exports = router;
