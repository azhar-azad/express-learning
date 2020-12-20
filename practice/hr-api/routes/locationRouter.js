const express = require('express');
const {
  createLocation,
  getLocations
} = require('../controllers/locationController.js');

const locationRouter = express.Router();

// CREATE LOCATION
locationRouter.post('/', createLocation);

// GET ALL LOCATIONS
locationRouter.get('/', getLocations);

module.exports = locationRouter;