const express = require('express');
const {
  createRegion,
  getRegions
} = require('../controllers/regionController.js');

const regionRouter = express.Router();

// CREATE REGION
regionRouter.post('/', createRegion);

// GET ALL REGION
regionRouter.get('/', getRegions);

module.exports = regionRouter;