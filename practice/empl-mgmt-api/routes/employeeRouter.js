import express from 'express';
import {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

// METHODS

router.post('/', createEmployee);

router.get('/', getEmployees);

router.get('/:id', getEmployee);

router.patch('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);


export default router;