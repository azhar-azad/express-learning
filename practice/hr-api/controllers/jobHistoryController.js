const JobHistory = require('../models/JobHistory.js');
const Employee = require('../models/Employee.js');
const Department = require('../models/Department.js');
const Job = require('../models/Job.js');

const { sendData, sendError } = require('./messageController.js');

// JobHistory has dependency on Employee, Department, Job
// Save the Employee, Department, Job first before saving JobHistory

const createJobHistory = async (req, res) => {
  try {
    const jobHistory = new JobHistory(req.body);
  
    const employee = await Employee.findById({ _id: jobHistory.employee });
    const department = await Department.findById({ _id: jobHistory.department });
    const job = await Job.findById({ _id: jobHistory.job });
    
    if (employee === null) {
      sendError(res, 400, 'Employee is not found. Save the employee first.');
    }
    else {
      if (department === null) {
        sendError(res, 400, 'Department is not found. Save the department first.');
      }
      else {
        if (job === null) {
          sendError(res, 400, 'Job is not found. Save the job first.');
        }
        else {
          await jobHistory.save();
          
          employee.jobHistory = jobHistory;
          await employee.save();
  
          department.jobHistory = jobHistory;
          await department.save();
  
          job.jobHistory = jobHistory;
          await job.save();
  
          sendData(res, 201, jobHistory);
        }
      }
    }
    
  } catch (e) {
    sendError(res, 400, e.message);
  }
};

const getJobHistories = async (req, res) => {
  try {
    const jobHistories = await JobHistory.find();
    sendData(res, 200, jobHistories);
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
  createJobHistory,
  getJobHistories
};