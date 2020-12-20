const Employee = require('../models/Employee.js');
const Department = require('../models/Department.js');
const Job = require('../models/Job.js');

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    
    const department = await Department.findById({ _id: employee.department });
    department.employees.push(employee);
    await department.save();
  
    const job = await Job.findById({ _id: employee.job });
    job.employees.push(employee);
    await job.save();
    
    sendData(res, 201, employee);
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    sendData(res, 200, employees);
  } catch (e) {
    sendError(res, 500, e);
  }
};

// PRIVATE METHODS ONLY FOR THIS MODULE
const sendData = (res, statusCode, data) => {
  res.status(statusCode).json({
    success: true,
    data: data
  });
};

const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  createEmployee,
  getEmployees
};