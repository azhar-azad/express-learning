const express = require('express');
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController.js');

const jobRouter = express.Router();

// CREATE JOB
jobRouter.post('/', createJob);

// GET ALL JOBS
jobRouter.get('/', getJobs);

// GET JOB BY ID
jobRouter.get('/:id', getJob);

// UPDATE JOB BY ID
jobRouter.put('/:id', updateJob);

// DELETE JOB BY ID
jobRouter.delete('/:id', deleteJob);

module.exports = jobRouter;