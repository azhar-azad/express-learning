import Employee from '../models/employee.js';

/*
METHODS
 */

// CREATE NEW EMPLOYEE - POST /employees
export const createEmployee = async (req, res) => {
  console.log('POST /employees/');
  
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    designation: req.body.designation,
    salary: req.body.salary
  });
  
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// GET ALL EMPLOYEES - GET /employees
export const getEmployees = async (req, res) => {
  console.log('GET /employees');
  
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET EMPLOYEE BY ID - GET /employees/id
export const getEmployee = async (req, res) => {
  console.log('GET /employees/id');
  
  const { statusCode, errorMessage, employee } = await getEmployeeById(req.params.id);
  
  if (statusCode !== 200) {
    sendErrorMessage(statusCode, errorMessage, res);
  }
  else {
    res.send(employee);
  }
};

export const updateEmployee = async (req, res) => {
  console.log('PATCH /employees/id');
  
  const { statusCode, errorMessage, employee } = await getEmployeeById(req.params.id);
  
  if (statusCode !== 200) {
    sendErrorMessage(statusCode, errorMessage, res);
  }
  else {
    const { firstName, lastName, designation, salary } = req.body;
    
    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (designation) employee.designation = designation;
    if (salary) employee.salary = salary;
    
    try {
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
};

export const deleteEmployee = async (req, res) => {
  console.log('DELETE /employee/id');
  
  const { statusCode, errorMessage, employee } = await getEmployeeById(req.params.id);
  
  if (statusCode !== 200) {
    sendErrorMessage(statusCode, errorMessage, res);
  }
  else {
    try {
      await employee.remove();
      res.json({ message: `Employee Deleted: ${employee.firstName} ${employee.lastName}` });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
};

// private function to use only on this file
// returns an employee given its id
const getEmployeeById = async (id) => {
  let returnObj = {
    statusCode: 200,
    employee: null
  };
  
  /*
  TODO: FIX THIS METHOD. send req and res through function parameter
   */
  
  try {
    let employee = await Employee.findById(id);
    
    // employee is not found in database
    if (employee === null) {
      returnObj.statusCode = 404;
      return returnObj;
    }
    // employee is found in database
    returnObj.employee = employee;
    return returnObj;
  }
  catch (e) {
    // error happened
    returnObj.statusCode = 500;
    returnObj.errorMessage = e.message;
    return returnObj;
  }
};

// sends error messages
const sendErrorMessage = (statusCode, errorMessage, res) => {
  if (statusCode === 500) {
    res.status(statusCode).json({ message: errorMessage });
  }
  else if (statusCode === 404) {
    res.status(statusCode).json({ message: 'Cannot find employee' });
  }
  else {
    res.send('Wrong status code: ' + statusCode);
  }
};