const Department = require('../models/Department.js');
const Location = require('../models/Location.js');

const { sendData, sendError } = require('./messageController.js');

// Department has dependency on Location
// Save the Location first before saving Department

const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    
    const location = await Location.findById({ _id: department.location });
    if (location === null) {
      sendError(res, 400, 'Location is not found. Save the location first');
    }
    else {
      await department.save();
  
      location.departments.push(department);
      await location.save();
  
      sendData(res, 201, department);
    }
    
  } catch (e) {
    sendError(res, 400, e.message);
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    sendData(res, 200, departments);
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
  createDepartment,
  getDepartments
};