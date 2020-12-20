const JobHistory = require('../models/JobHistory.js');
const Employee = require('../models/Employee.js');
const Department = require('../models/Department.js');
const Job = require('../models/Job.js');

const createJobHistory = async (req, res) => {
  try {
    const jobHistory = new JobHistory(req.body);
    await jobHistory.save();
    
    const employee = await Employee.findById({ _id: jobHistory.employee });
    employee.jobHistory = jobHistory;
    await employee.save();
  
    const department = await Department.findById({ _id: jobHistory.department });
    department.jobHistory = jobHistory;
    await department.save();
    
    const job = await Job.findById({ _id: jobHistory.job });
    job.jobHistory = jobHistory;
    await job.save();
    
    sendData(res, 201, jobHistory);
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getJobHistories = async (req, res) => {
  try {
    const jobHistories = await JobHistory.find();
    sendData(res, 200, jobHistories);
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
  createJobHistory,
  getJobHistories
};