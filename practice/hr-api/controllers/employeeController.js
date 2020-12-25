const Employee = require('../models/Employee.js');
const Department = require('../models/Department.js');
const Job = require('../models/Job.js');

const { sendData, sendError } = require('./messageController.js');

// Employee has dependency on Department, Job
// Save the Department, Job first before saving Employee

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
  
    const department = await Department.findById({ _id: employee.department });
    const job = await Job.findById({ _id: employee.job });
    
    if (department === null) {
      sendError(res, 400, 'Department is not found. Save the department first.');
    }
    else {
      if (job === null) {
        sendError(res, 400, 'Job is not found. Save the job first');
      }
      else {
        await employee.save();
  
        department.employees.push(employee);
        await department.save();
  
        job.employees.push(employee);
        await job.save();
  
        sendData(res, 201, employee);
      }
    }
    
  } catch (e) {
    sendError(res, 400, e.message);
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    sendData(res, 200, employees);
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

// PRIVATE METHODS ONLY FOR THIS MODULE
// const sendData = (res, statusCode, data) => {
//   res.status(statusCode).json({
//     success: true,
//     data: data
//   });
// };
//
// const sendError = (res, statusCode, error) => {
//   res.status(statusCode).json({
//     success: false,
//     message: error.message
//   });
// };

module.exports = {
  createEmployee,
  getEmployees
};