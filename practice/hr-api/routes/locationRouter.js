const express = require('express');
const {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locationController.js');

const locationRouter = express.Router();

// CREATE LOCATION
locationRouter.post('/', createLocation);

// GET ALL LOCATIONS
locationRouter.get('/', getLocations);

// GET LOCATION BY ID
locationRouter.get('/:id', getLocation);

// UPDATE LOCATION BY ID
locationRouter.put('/:id', updateLocation);

// DELETE LOCATION BY ID
locationRouter.delete('/:id', deleteLocation);

module.exports = locationRouter;