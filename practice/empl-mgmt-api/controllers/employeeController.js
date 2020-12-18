import Employee from '../models/employee.js';

export const getEmployees = (req, res) => {
  console.log('GET /employees');
  res.send('GET /employees');
};