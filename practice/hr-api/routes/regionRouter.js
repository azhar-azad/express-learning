const express = require('express');
const {
  createRegion,
  getRegions,
  getRegion,
  updateRegion,
  deleteRegion
} = require('../controllers/regionController.js');

const regionRouter = express.Router();

// CREATE REGION
regionRouter.post('/', createRegion);

// GET ALL REGION
regionRouter.get('/', getRegions);

// GET REGION BY ID
regionRouter.get('/:id', getRegion);

// UPDATE REGION BY ID
regionRouter.patch('/:id', updateRegion);

// DELETE REGION BY ID
regionRouter.delete('/:id', deleteRegion);

module.exports = regionRouter;