const Job = require('../models/Job.js');

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    
    // const country = await Country.findById({ _id: location.country });
    // country.locations.push(location);
    // await country.save();
    
    sendData(res, 201, job);
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    sendData(res, 200, jobs);
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
  createJob,
  getJobs
};