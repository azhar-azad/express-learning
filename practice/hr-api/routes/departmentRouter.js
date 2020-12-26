const express = require('express');
const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController.js');

const departmentRouter = express.Router();

// CREATE DEPARTMENT
departmentRouter.post('/', createDepartment);

// GET ALL DEPARTMENTS
departmentRouter.get('/', getDepartments);

// GET DEPARTMENTS BY ID
departmentRouter.get('/:id', getDepartment);

// UPDATE DEPARTMENTS BY ID
departmentRouter.put('/:id', updateDepartment);

// DELETE DEPARTMENTS BY ID
departmentRouter.delete('/:id', deleteDepartment);

module.exports = departmentRouter;