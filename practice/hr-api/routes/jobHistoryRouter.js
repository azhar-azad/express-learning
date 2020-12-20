const express = require('express');
const {
  createJobHistory,
  getJobHistories
} = require('../controllers/jobHistoryController.js');

const jobHistoryRouter = express.Router();

// CREATE JOBHISTORY
jobHistoryRouter.post('/', createJobHistory);

// GET ALL JOBHISTORieS
jobHistoryRouter.get('/', getJobHistories);

module.exports = jobHistoryRouter;