const Job = require('../models/Job.js');

const { sendData, sendError } = require('./messageController.js');

const createJob = async (req, res) => {
  let job = null;
  try {
    job = new Job(req.body);
    await job.save();
    
    sendData(res, 201, job);
    
  } catch (e) {
    if (e.message.includes('E11000'))
      sendError(res, 400, `${job.jobTitle} exists.`);
    else
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

const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job === null) {
      sendError(res, 404, 'Job is not found');
      return;
    }
    
    sendData(res, 200, job);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const updateJob = async (req, res) => {
  let job = null;
  try {
    job = await Job.findById(req.params.id);
    if (job === null) {
      sendError(res, 404, 'Job is not found');
      return;
    }
    
    const { jobTitle, minSalary, maxSalary } = req.body;
    if (jobTitle)
      job.jobTitle = jobTitle;
    if (minSalary)
      job.minSalary = minSalary;
    if (maxSalary)
      job.maxSalary = maxSalary;
    
    await job.save();
    
    sendData(res, 200, job);
    
  } catch (e) {
    if (e.message.includes('E11000'))
      sendError(res, 400, `${job.jobTitle} exists.`);
    else
      sendError(res, 500, e.message)
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job === null) {
      sendError(res, 404, 'Job is not found');
      return;
    }
    
    await job.remove();
    sendData(res, 200, 'Job Deleted: ' + job.jobTitle);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
};