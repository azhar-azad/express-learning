const Location = require('../models/Location.js');
const Country = require('../models/Country.js');

const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    
    const country = await Country.findById({ _id: location.country });
    country.locations.push(location);
    await country.save();
    
    sendData(res, 201, location);
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    sendData(res, 200, locations);
  } catch (e) {
    sendError(res, 500, e);
  }
};

// PRIVATE METHODS ONLY FOR THIS MODULE
const sendData = (res, statusCode, data) => {
  res.status(statusCode).json({
    success: true,
    data: data
  });
};

const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  createLocation,
  getLocations
};