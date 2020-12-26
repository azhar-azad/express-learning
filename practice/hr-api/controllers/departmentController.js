const Department = require('../models/Department.js');
const Location = require('../models/Location.js');

const { sendData, sendError } = require('./messageController.js');

// Department has dependency on Location
// Save the Location first before saving Department

const createDepartment = async (req, res) => {
  
  let department = null;
  try {
    department = new Department(req.body);
    
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
    if (e.message.includes('E11000'))
      sendError(res, 400, `${department.departmentName} exists.`);
    else
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

const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (department === null) {
      sendError(res, 404, 'Department is not found');
      return;
    }
    
    sendData(res, 200, department);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const updateDepartment = async (req, res) => {
  let department = null;
  try {
    department = await Department.findById(req.params.id);
    if (department === null) {
      sendError(res, 404, 'Department is not found');
      return;
    }
    
    const { departmentName } = req.body;
    if (departmentName)
      department.departmentName = departmentName;
    
    await department.save();
    
    sendData(res, 200, department);
    
  } catch (e) {
    if (e.message.includes('E11000'))
      sendError(res, 400, `${department.departmentName} exists.`);
    else
      sendError(res, 500, e.message)
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (department === null) {
      sendError(res, 404, 'Department is not found');
      return;
    }
    
    await department.remove();
    sendData(res, 200, 'Department Deleted: ' + department.departmentName);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
};