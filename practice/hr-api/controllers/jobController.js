const Job = require('../models/Job.js');

const { sendData, sendError } = require('./messageController.js');

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    
    sendData(res, 201, job);
  } catch (e) {
    sendError(res, 400, e.message);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    sendData(res, 200, jobs);
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
  createJob,
  getJobs
};