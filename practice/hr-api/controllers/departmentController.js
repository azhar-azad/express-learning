const Department = require('../models/Department.js');
const Location = require('../models/Location.js');

const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    
    const location = await Location.findById({ _id: department.location });
    location.departments.push(department);
    await location.save();
    
    sendData(res, 201, department);
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    sendData(res, 200, departments);
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
  createDepartment,
  getDepartments
};