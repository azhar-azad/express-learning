const express = require('express');
const {
  createJobHistory,
  getJobHistories,
  getJobHistory,
  updateJobHistory,
  deleteJobHistory
} = require('../controllers/jobHistoryController.js');

const jobHistoryRouter = express.Router();

// CREATE JOBHISTORY
jobHistoryRouter.post('/', createJobHistory);

// GET ALL JOBHISTORIES
jobHistoryRouter.get('/', getJobHistories);

// GET JOBHISTORY BY ID
jobHistoryRouter.get('/:id', getJobHistory);

// UPDATE JOBHISTORY BY ID
jobHistoryRouter.put('/:id', updateJobHistory);

// DELETE JOBHISTORY BY ID
jobHistoryRouter.delete('/:id', deleteJobHistory);

module.exports = jobHistoryRouter;