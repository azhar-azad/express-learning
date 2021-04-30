const Employee = require('../models/Employee.js');
const Department = require('../models/Department.js');
const Job = require('../models/Job.js');

const { sendData, sendError } = require('./messageController.js');

// Employee has dependency on Department, Job
// Save the Department, Job first before saving Employee

const createEmployee = async (req, res) => {
  
  let employee = null;
  try {
    employee = new Employee(req.body);
  
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
    if (e.message.includes('E11000'))
      sendError(res, 400, `${employee.email} exists.`);
    else
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

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee === null) {
      sendError(res, 404, 'Employee is not found');
      return;
    }
    
    sendData(res, 200, employee);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const updateEmployee = async (req, res) => {
  let employee = null;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee === null) {
      sendError(res, 404, 'Employee is not found');
      return;
    }
    
    const { firstName, lastName, email, phoneNumber, salary } = req.body;
    if (firstName)
      employee.firstName = firstName;
    if (lastName)
      employee.lastName = lastName;
    if (email)
      employee.email = email;
    if (phoneNumber)
      employee.phoneNumber = phoneNumber;
    if (salary)
      employee.salary = salary;
    
    await employee.save();
    
    sendData(res, 200, employee);
    
  } catch (e) {
    if (e.message.includes('E11000'))
      sendError(res, 400, `${employee.email} exists.`);
    else
      sendError(res, 500, e.message)
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee === null) {
      sendError(res, 404, 'Employee is not found');
      return;
    }
    
    await employee.remove();
    sendData(res, 200, 'Employee Deleted: ' + employee.email);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
};