const express = require('express');
const {
  createJob,
  getJobs
} = require('../controllers/jobController.js');

const jobRouter = express.Router();

// CREATE JOB
jobRouter.post('/', createJob);

// GET ALL JOBS
jobRouter.get('/', getJobs);

module.exports = jobRouter;