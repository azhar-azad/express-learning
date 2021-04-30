const express = require('express');

const {
  createPublisher,
  getPublishers,
  getPublisher,
  updatePublisher,
  deletePublisher
} = require('../controllers/publisherController.js');

const pubRouter = express.Router();

// CREATE
pubRouter.post('/', createPublisher);

// GET ALL
pubRouter.get('/', getPublishers);

// GET ONE BY ID
pubRouter.get('/:id', getPublisher);

// UPDATE ONE BY ID
pubRouter.patch('/:id', updatePublisher);

// DELETE ONE BY ID
pubRouter.delete('/:id', deletePublisher);

module.exports = pubRouter;